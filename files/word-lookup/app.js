const STORAGE_KEY = 'confusable_words';

const SAMPLE_DATA = [
    { current_word: 'grasp', mean1: '抓住(38%),把握(30%),领会(16%)', confuse_word: 'gasp', mean2: '喘气(47%),喘息(36%)' },
    { current_word: 'process', mean1: '过程(58%),处理(33%)', confuse_word: 'progress', mean2: '进步(65%),发展(20%)' },
    { current_word: 'effort', mean1: '努力(96%)', confuse_word: 'affect', mean2: '影响(95%)' },
    { current_word: 'device', mean1: '设备(55%),装置(39%)', confuse_word: 'devise', mean2: '设计(81%)' },
    { current_word: 'bribery', mean1: '受贿(58%),行贿(41%)', confuse_word: 'betrayal', mean2: '背叛(98%)' },
    { current_word: 'civility', mean1: '礼貌(89%)', confuse_word: 'civilian', mean2: '平民(87%)' },
    { current_word: 'aggregate', mean1: '集料(55%),总计(18%),总的(17%)', confuse_word: 'aggravate', mean2: '恶化(71%),严重(29%)' },
    { current_word: 'picnic', mean1: '野餐(98%)', confuse_word: 'panic', mean2: '恐慌(63%),惊慌(24%)' },
    { current_word: 'distinct', mean1: '不同的(55%),明显的(30%)', confuse_word: 'distinction', mean2: '区分(50%),差别(33%)' },
    { current_word: 'whistle', mean1: '口哨(45%),汽笛(21%),吹口哨(17%)', confuse_word: 'wrestle', mean2: '摔跤(49%),斗争(27%),斟酌(9%)' },
    { current_word: 'speciality', mean1: '专长(100%)', confuse_word: 'specialize', mean2: '专攻(100%)' },
    { current_word: 'diplomat', mean1: '外交官(99%)', confuse_word: 'diploma', mean2: '文凭(100%)' },
    { current_word: 'distinction', mean1: '区分(50%),差别(33%)', confuse_word: 'discrimination', mean2: '歧视(94%)' },
    { current_word: 'flour', mean1: '面粉(97%)', confuse_word: 'flood', mean2: '洪水(82%)' },
    { current_word: 'competent', mean1: '有能力的(53%),胜任的(28%)', confuse_word: 'compete', mean2: '竞争(78%),比赛(19%)' }
];

const DEFAULT_SETTINGS = {
    apiKey: '',
    apiUrl: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    systemPrompt: 'You are a helpful assistant.',
    promptTemplate: '有个完整的英语单词, 不是短语, 外形类似于{word}, 但是意思为"{meaning}", 请给出最可能的5个词, 最多不超过10个'
};

// ── State ─────────────────────────────────────────
let settings = { ...DEFAULT_SETTINGS };
let words = [];
let selectedCandidate = null;
let selectedCandidateMeaning = '';
let currentWordCoca = '';
let selectedCandidateCoca = '';
let lookupPending = false;
let lastLookedWord = '';

// ── DOM refs ──────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const currentWordInput = $('#currentWordInput');
const currentMean = $('#currentMean');
const confuseMeaningInput = $('#confuseMeaningInput');
const candidateList = $('#candidateList');
const candidateMean = $('#candidateMean');
const btnGuess = $('#btnGuess');
const btnConfirm = $('#btnConfirm');
const btnManualAdd = $('#btnManualAdd');
const tableBody = $('#tableBody');
const countLabel = $('#countLabel');
const toast = $('#toast');
const settingsOverlay = $('#settingsOverlay');
const fileInput = $('#fileInput');

// ── Storage ───────────────────────────────────────
function loadWords() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        words = raw ? JSON.parse(raw) : [];
    } catch {
        words = [];
    }
    renderTable();
}

function saveWords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// ── Toast ─────────────────────────────────────────
let toastTimer = null;
function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className = 'toast ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.classList.add('hidden'); }, 2500);
}

// ── Dictionary ────────────────────────────────────
function lookupWord(word) {
    if (!word || !word.trim()) return { coca: '', meaning: '' };
    const w = word.trim().toLowerCase();
    const dict = window.TLD_DICT || {};
    if (dict[w]) {
        const entry = dict[w];
        const coca = entry.coca || '';
        let meaning = entry.meaning || '';
        if (meaning.length > 200) {
            meaning = meaning.slice(0, 200) + '...';
        }
        return { coca, meaning };
    }
    return { coca: '', meaning: '' };
}

function formatMean(result) {
    if (!result.coca && !result.meaning) return '未找到释义';
    const lines = [];
    if (result.coca) lines.push(result.coca);
    if (result.meaning) lines.push(result.meaning);
    return lines.join('\n');
}

function setMeanLoading(el) {
    el.classList.add('loading');
    el.innerHTML = '<span class="placeholder-text">查询中...</span>';
}

function setMeanContent(el, text) {
    el.classList.remove('loading');
    el.textContent = text || '未找到释义';
}

// ── AI Query ──────────────────────────────────────
async function queryAI(currentWord, confuseMean) {
    const prompt = settings.promptTemplate
        .replace(/\{word\}/g, currentWord)
        .replace(/\{meaning\}/g, confuseMean);

    const body = {
        model: settings.model,
        messages: [
            { role: 'system', content: settings.systemPrompt },
            { role: 'user', content: prompt }
        ]
    };

    const res = await fetch(settings.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`API 请求失败 (${res.status}): ${errText}`);
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || '';

    const thinkIdx = content.indexOf('<think>');
    if (thinkIdx !== -1) {
        const endThink = content.indexOf('</think>');
        if (endThink !== -1) {
            content = content.slice(endThink + 8).trim();
        }
    }

    const regex = /\b[a-zA-Z][a-zA-Z0-9'-]*\b/g;
    const matches = content.match(regex) || [];
    return [...new Set(matches)];
}

// ── CSV Helpers ───────────────────────────────────
function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const fields = [];
        let current = '';
        let inQuote = false;
        for (let j = 0; j < lines[i].length; j++) {
            const ch = lines[i][j];
            if (inQuote) {
                if (ch === '"') {
                    if (j + 1 < lines[i].length && lines[i][j + 1] === '"') {
                        current += '"';
                        j++;
                    } else {
                        inQuote = false;
                    }
                } else {
                    current += ch;
                }
            } else {
                if (ch === '"') {
                    inQuote = true;
                } else if (ch === ',') {
                    fields.push(current.trim());
                    current = '';
                } else {
                    current += ch;
                }
            }
        }
        fields.push(current.trim());
        if (fields.length >= 4) {
            result.push({
                current_word: fields[0],
                mean1: fields[1],
                confuse_word: fields[2],
                mean2: fields[3]
            });
        }
    }
    return result;
}

function toCSV(records) {
    let csv = 'current_word,mean1,confuse_word,mean2\n';
    for (const r of records) {
        const row = [r.current_word, r.mean1, r.confuse_word, r.mean2]
            .map(field => {
                if (field.includes(',') || field.includes('"') || field.includes('\n')) {
                    return `"${field.replace(/"/g, '""')}"`;
                }
                return field;
            });
        csv += row.join(',') + '\n';
    }
    return csv;
}

function exportCSV() {
    if (words.length === 0) {
        showToast('没有数据可导出', 'error');
        return;
    }
    const csv = toCSV(words);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'confusable_words.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast(`已导出 ${words.length} 对`, 'success');
}

function importCSV(file) {
    const reader = new FileReader();
    reader.onload = () => {
        const records = parseCSV(reader.result);
        if (records.length === 0) {
            showToast('未识别到有效数据', 'error');
            return;
        }
        const existingKeys = new Set(words.map(w => `${w.current_word}|${w.confuse_word}`));
        let added = 0;
        for (const r of records) {
            const key = `${r.current_word}|${r.confuse_word}`;
            if (!existingKeys.has(key)) {
                words.push(r);
                existingKeys.add(key);
                added++;
            }
        }
        saveWords();
        renderTable();
        showToast(`导入完成，新增 ${added} 对（跳过 ${records.length - added} 对重复）`, 'success');
    };
    reader.readAsText(file);
}

// ── Table Rendering ───────────────────────────────
function renderTable() {
    tableBody.innerHTML = '';
    countLabel.textContent = `${words.length} 对`;

    if (words.length === 0) {
        tableBody.innerHTML = '<tr class="empty-row"><td colspan="5">暂无数据 —— 龙还没开始刨呢</td></tr>';
        return;
    }

    words.forEach((w, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-word">${escapeHtml(w.current_word)}</td>
            <td class="col-mean">${escapeHtml(w.mean1)}</td>
            <td class="col-word">${escapeHtml(w.confuse_word)}</td>
            <td class="col-mean">${escapeHtml(w.mean2)}</td>
            <td class="col-action"><button class="btn-del" data-idx="${idx}">删除</button></td>
        `;
        tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            words.splice(idx, 1);
            saveWords();
            renderTable();
            showToast('已删除', 'success');
        });
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ── Event Handlers ────────────────────────────────

// Current word input: auto lookup on Enter or blur
currentWordInput.addEventListener('focus', () => {
    if (currentWordInput.value.trim() === lastLookedWord) {
        lastLookedWord = '';
    }
});

currentWordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        doLookupCurrent();
    }
});

currentWordInput.addEventListener('blur', () => {
    doLookupCurrent();
});

function doLookupCurrent() {
    const word = currentWordInput.value.trim();
    if (!word) return;
    if (word === lastLookedWord) return;
    lookupPending = true;
    lastLookedWord = word;
    setMeanLoading(currentMean);
    const result = lookupWord(word);
    currentWordCoca = result.coca;
    setMeanContent(currentMean, formatMean(result));
    lookupPending = false;
}

// Guess button
btnGuess.addEventListener('click', async () => {
    const currentWord = currentWordInput.value.trim();
    const confuseMean = confuseMeaningInput.value.trim();
    if (!currentWord) { showToast('请先输入当前单词', 'error'); return; }
    if (!confuseMean) { showToast('请输入易混意思', 'error'); return; }
    if (!settings.apiKey) { showToast('请先在设置中填写 API Key', 'error'); return; }

    btnGuess.disabled = true;
    btnGuess.textContent = '查询中...';
    candidateList.innerHTML = '';
        candidateMean.innerHTML = '<span class="placeholder-text">选一个词，看看它是什么意思</span>';
    selectedCandidate = null;
    selectedCandidateMeaning = '';
    selectedCandidateCoca = '';
    btnConfirm.disabled = true;

    try {
        const candidates = await queryAI(currentWord, confuseMean);
        if (candidates.length === 0) {
            showToast('AI 未返回有效结果', 'error');
        } else {
            renderCandidates(candidates);
            showToast(`找到 ${candidates.length} 个候选词`, 'success');
        }
    } catch (err) {
        showToast(err.message || 'AI 请求失败', 'error');
    } finally {
        btnGuess.disabled = false;
        btnGuess.textContent = '猜词';
    }
});

function renderCandidates(candidates) {
    candidateList.innerHTML = '';
    candidates.forEach(word => {
        const li = document.createElement('li');
        li.className = 'candidate-item';
        li.textContent = word;
        li.addEventListener('click', () => selectCandidate(word, li));
        candidateList.appendChild(li);
    });
}

async function selectCandidate(word, li) {
    candidateList.querySelectorAll('.candidate-item').forEach(el => el.classList.remove('selected'));
    if (selectedCandidate === word) {
        selectedCandidate = null;
        selectedCandidateMeaning = '';
        selectedCandidateCoca = '';
        btnConfirm.disabled = true;
    candidateMean.innerHTML = '<span class="placeholder-text">选一个词，看看它是什么意思</span>';
        return;
    }
    li.classList.add('selected');
    selectedCandidate = word;
    setMeanLoading(candidateMean);
    const result = lookupWord(word);
    selectedCandidateCoca = result.coca;
    selectedCandidateMeaning = result.meaning;
    setMeanContent(candidateMean, formatMean(result));
    btnConfirm.disabled = false;
}

// Manual add button
btnManualAdd.addEventListener('click', () => {
    const text = confuseMeaningInput.value.trim();
    if (!text) { showToast('请先在易混意思输入框中输入单词', 'error'); return; }
    const word = text.split(/\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
    if (!word) { showToast('请输入一个完整的英语单词', 'error'); return; }
    selectCandidateManual(word);
});

async function selectCandidateManual(word) {
    candidateList.querySelectorAll('.candidate-item').forEach(el => el.classList.remove('selected'));
    let found = false;
    candidateList.querySelectorAll('.candidate-item').forEach(el => {
        if (el.textContent.toLowerCase() === word.toLowerCase()) {
            el.classList.add('selected');
            found = true;
        }
    });
    if (!found) {
        const li = document.createElement('li');
        li.className = 'candidate-item selected';
        li.textContent = word;
        li.addEventListener('click', () => selectCandidate(word, li));
        candidateList.appendChild(li);
    }
    selectedCandidate = word;
    setMeanLoading(candidateMean);
    const result = lookupWord(word);
    selectedCandidateCoca = result.coca;
    selectedCandidateMeaning = result.meaning;
    setMeanContent(candidateMean, formatMean(result));
    btnConfirm.disabled = false;
}

// Confirm button
btnConfirm.addEventListener('click', () => {
    const currentWord = currentWordInput.value.trim();
    const confuseWord = selectedCandidate;
    const mean1 = currentWordCoca;
    const mean2 = selectedCandidateCoca;

    if (!currentWord || !confuseWord) { showToast('请完成选择和查词', 'error'); return; }

    const existingKey = `${currentWord}|${confuseWord}`;
    if (words.some(w => `${w.current_word}|${w.confuse_word}` === existingKey)) {
        showToast('该词对已存在', 'error');
        return;
    }

    words.push({
        current_word: currentWord,
        mean1: mean1 || '',
        confuse_word: confuseWord,
        mean2: mean2 || ''
    });
    saveWords();
    renderTable();
    showToast('已保存', 'success');
});

// Clear all
$('#btnClearAll').addEventListener('click', () => {
    if (words.length === 0) { showToast('没有数据可清除', 'error'); return; }
    if (!confirm(`确定要删除全部 ${words.length} 对数据吗？此操作不可恢复。`)) return;
    words = [];
    saveWords();
    renderTable();
    showToast('已清除全部数据', 'success');
});

// Export
$('#btnExport').addEventListener('click', exportCSV);

// Import
$('#btnImport').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        importCSV(fileInput.files[0]);
        fileInput.value = '';
    }
});

// ── Settings ──────────────────────────────────────
function loadSettingsFields() {
    $('#apiKeyInput').value = settings.apiKey;
    $('#apiUrlInput').value = settings.apiUrl;
    $('#modelInput').value = settings.model;
    $('#systemPromptInput').value = settings.systemPrompt;
    $('#promptTemplateInput').value = settings.promptTemplate;
}

function saveSettingsFields() {
    settings.apiKey = $('#apiKeyInput').value.trim();
    settings.apiUrl = $('#apiUrlInput').value.trim() || DEFAULT_SETTINGS.apiUrl;
    settings.model = $('#modelInput').value.trim() || DEFAULT_SETTINGS.model;
    settings.systemPrompt = $('#systemPromptInput').value.trim();
    settings.promptTemplate = $('#promptTemplateInput').value.trim() || DEFAULT_SETTINGS.promptTemplate;
    showToast('设置已保存（仅当前会话有效）', 'success');
}

$('#btnSettings').addEventListener('click', () => {
    loadSettingsFields();
    settingsOverlay.classList.remove('hidden');
});

$('#btnCloseSettings').addEventListener('click', () => {
    settingsOverlay.classList.add('hidden');
});

settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
        settingsOverlay.classList.add('hidden');
    }
});

$('#btnSaveSettings').addEventListener('click', saveSettingsFields);

// Load sample data
$('#btnLoadSample').addEventListener('click', () => {
    const existingKeys = new Set(words.map(w => `${w.current_word}|${w.confuse_word}`));
    let added = 0;
    for (const r of SAMPLE_DATA) {
        const key = `${r.current_word}|${r.confuse_word}`;
        if (!existingKeys.has(key)) {
            words.push({ ...r });
            existingKeys.add(key);
            added++;
        }
    }
    saveWords();
    renderTable();
    showToast(`已加载 ${added} 对示例数据（跳过 ${SAMPLE_DATA.length - added} 对重复）`, 'success');
});

// ── Init ──────────────────────────────────────────
function init() {
    loadSettingsFields();
    loadWords();
}

init();
