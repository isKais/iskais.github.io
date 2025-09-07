
var noSleep = new NoSleep();
// --- DOM 元素获取 ---
// 使用 const 定义不会改变的元素变量，更安全
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const delBtn = document.getElementById("delete");
const addBtn = document.getElementById("add");

// --- 全局常量 ---
const MAX_TIME_IN_SECONDS = 99 * 60 + 59; // 最大时间限制（99分59秒）

// --- 状态管理 (已更新并简化) ---
window.state = {
    timerId: null,
    timeInSeconds: 0,
    isRunning: false,
    isCountdown: false,
    isInit: true,

    // -- 简化的精确计时状态 --
    startTime: 0,           // 计时器“理论上”的开始时间戳
    initialCountdownTime: 0, // 倒计时模式下的初始总秒数

    // 模式
    clock: false,
};


// --- 核心功能函数 (已全部更新) ---

/**
 * @description 启动计时器 (已更新)
 */
function startTimer() {
    // 1. 防止重复启动
    if (state.isRunning) return;
    state.isRunning = true;

    // 2. 判断是全新开始还是恢复
    if (state.isInit) {
        // 全新开始
        // 全新开始的时候进行正/倒计时判断
        state.isCountdown = state.timeInSeconds > 0;
        // 一些开始时候的设置
        noSleep.enable();
        exitAnimation(startBtn);    // 隐藏开始按钮
        enterAnimation(stopBtn);
        enterAnimation(resetBtn);

        if (state.isCountdown) {
            state.initialCountdownTime = state.timeInSeconds;
        }
        state.startTime = Date.now(); // 直接记录当前时间为开始时间
        state.isInit = false;

    } else {
        // 从暂停中恢复
        let elapsedMs = 0;
        if (state.isCountdown) {
            // 对于倒计时，已流逝时间 = 初始时间 - 暂停时显示的时间
            elapsedMs = (state.initialCountdownTime - state.timeInSeconds) * 1000;
        } else {
            // 对于正计时，已流逝时间 = 暂停时显示的时间
            elapsedMs = state.timeInSeconds * 1000;
        }
        // 关键：通过“当前时间 - 已流逝时间”来倒推出理论上的开始时间
        state.startTime = Date.now() - elapsedMs;
    }

    // 3. 启动计时器循环
    // 为避免UI延迟，可以立即执行一次，但为逻辑清晰，此处省略，1秒后的首次触发已足够精确
    state.timerId = setInterval(tick, 1000);
    stopBtn.textContent = "暂停";
}

/**
 * @description 停止/暂停计时器 (已更新，变得非常简单)
 */
function stopTimer() {
    clearInterval(state.timerId);
    state.isRunning = false;
    // 暂停时无需做任何计算，当前的时间状态已由最后一次tick函数保存在 state.timeInSeconds 中
}

/**
 * @description 重置计时器 (已更新)
 */
function resetTimer() {
    noSleep.disable();
    stopTimer(); // 调用简单的stopTimer
    state.timeInSeconds = 0;
    state.isInit = true;

    // 重置所有计时状态
    state.startTime = 0;
    state.initialCountdownTime = 0;

    updateDisplay();
    stopBtn.textContent = "暂停";
    enterAnimation(startBtn);
    exitAnimation(stopBtn);
    exitAnimation(resetBtn);
}

/**
 * @description 计时器的核心逻辑 (已更新) 没有搞懂, 需要后面再看
 */
function tick() {
    // 1. 计算总的真实流逝时间
    const elapsedMs = Date.now() - state.startTime;
    const elapsedSec = Math.floor(elapsedMs / 1000);

    // 2. 根据模式计算并更新显示时间
    if (state.isCountdown) {
        // 倒计时
        const remainingSeconds = state.initialCountdownTime - elapsedSec;
        state.timeInSeconds = remainingSeconds;

        if (state.timeInSeconds < 0) {
            alert("倒计时结束！");
            // playRandomSoundFromFiles(catComplete);
            resetTimer();
            return; // 重置后必须立即退出，防止后续代码出错
        }
    } else {
        // 正计时
        state.timeInSeconds = elapsedSec;
        if (state.timeInSeconds > MAX_TIME_IN_SECONDS) {
            state.timeInSeconds = MAX_TIME_IN_SECONDS;
            stopTimer(); // 达到上限时暂停
            // playRandomSoundFromFiles(catComplete);
            alert("已达到最大计时！");
        }
    }

    // 3. 更新界面显示
    updateDisplay();
}

// updateDisplay 函数无需修改，保持原样即可
function updateDisplay() {
    const time = Math.min(Math.max(0, state.timeInSeconds), MAX_TIME_IN_SECONDS);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

// --- 事件监听器绑定 ---

// "开始"按钮点击事件
startBtn.onclick = () => {
    startTimer();

};

// "暂停/恢复"按钮点击事件
stopBtn.onclick = function () {
    if (state.isRunning) {
        stopTimer();
        stopBtn.textContent = "恢复";
    } else {
        // 只有在时间不为0时，"恢复"才有意义
        if (state.timeInSeconds > 0) {
            startTimer();
        }
    }
};

// "重置"按钮点击事件
resetBtn.onclick = function () {
    resetTimer();
};

// 添加/删除按钮点击事件
addBtn.onclick = function () {
    const container = document.getElementById('log');
    const newElement = document.createElement('p');
    if (window.state.clock) {
        text = '[时刻]' + minutesElement.textContent + ':' + secondsElement.textContent
    } else {
        if (window.state.isCountdown) {
            text = '[倒计时]' + minutesElement.textContent + ':' + secondsElement.textContent
        } else {
            text = '[计时]' + minutesElement.textContent + ':' + secondsElement.textContent
        }

    }

    newElement.textContent = text;
    container.appendChild(newElement);
}
delBtn.onclick = function () {
    const lastChild = document.querySelector('#log>*:last-child');
    if (lastChild) { lastChild.remove(); }
}
// --- 滚轮调整时间控制器 ---
class WheelController {
    #element; // 私有字段：DOM元素
    #value = 0; // 私有字段：当前数值
    #max; // 私有字段：最大值
    #onUpdateCallback; // 私有字段：更新时触发的回调函数

    constructor(element, max, onUpdateCallback) {
        this.#element = element;
        this.#max = max;
        this.#onUpdateCallback = onUpdateCallback;  // 绑定回调函数
        // 绑定滚轮事件，并确保 this 指向类实例
        this.#element.addEventListener('wheel', this.#handleWheel.bind(this));
    }

    // 私有方法：处理滚轮事件
    #handleWheel(e) {
        // 如果计时器正在运行，则禁止调整时间
        if (state.isRunning) return;
        e.preventDefault(); // 阻止页面默认的滚动行为

        // 获取当前数据
        this.#value = Number(this.#element.textContent);
        playRandomSoundFromFiles(addNum);

        // 根据滚轮方向调整数值
        if (e.deltaY < 0) { // 向上滚动
            if (this.#value === this.#max) this.#value = 0
            else this.#value = Math.min(this.#value + 1, this.#max);
        } else { // 向下滚动
            if (this.#value === 0) this.#value = this.#max
            else this.#value = Math.max(this.#value - 1, 0);

        }
        this.#update();
    }

    // 私有方法：更新显示并通知外部
    #update() {
        this.#element.textContent = String(this.#value).padStart(2, "0");
        // 调用回调函数，通知外部数值已更改
        if (this.#onUpdateCallback) {
            this.#onUpdateCallback();
        }
    }
}

/**
 * @description 当滚轮控制器更新其值时，此回调函数被调用，用于更新全局总时间
 */
function onTimeChange() {
    const mins = parseInt(minutesElement.textContent, 10);
    const secs = parseInt(secondsElement.textContent, 10);
    state.timeInSeconds = mins * 60 + secs;
}

// 实例化分钟和秒钟的滚轮控制器
// 将 onTimeChange 函数作为回调传入
new WheelController(minutesElement, 99, onTimeChange);
new WheelController(secondsElement, 59, onTimeChange); // 秒的最大值设为59更符合习惯

// 刚开始不需要暂停和重置按钮
stopBtn.style.display = "none"
resetBtn.style.display = "none"