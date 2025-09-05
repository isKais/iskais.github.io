
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

// --- 状态管理 ---
// 使用一个对象来统一管理计时器的状态，使代码更清晰
window.state = {
    timerId: null,      // 存储 setInterval 的 ID，用于清除计时器
    timeInSeconds: 0,   // 以秒为单位的当前时间
    isRunning: false,   // 计时器是否正在运行
    isCountdown: false, // 是否为倒计时模式
    isInit: true,       // 只有初始化的时候才判断倒计时还是正计时
};

// --- 核心功能函数 ---

/**
 * @description 根据 state.timeInSeconds 更新页面上的分钟和秒数显示
 */
function updateDisplay() {
    // 限制时间不超过最大值
    const time = Math.min(state.timeInSeconds, MAX_TIME_IN_SECONDS);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // padStart 用于格式化字符串，确保始终为两位数，如 '05'
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

/**
 * @description 计时器的核心逻辑，每秒钟执行一次
 */
function tick() {
    // 判断是倒计时还是正计时
    if (state.isCountdown) {
        state.timeInSeconds--;
        // 倒计时结束
        if (state.timeInSeconds < 0) {
            alert("倒计时结束！");
            resetTimer();   // 重置计时器
        }
    } else {
        state.timeInSeconds++;
        // 正计时达到上限
        if (state.timeInSeconds > MAX_TIME_IN_SECONDS) {
            state.timeInSeconds = MAX_TIME_IN_SECONDS;
            resetTimer();   // 重置计时器
        }
    }
    updateDisplay(); // 更新显示
}

/**
 * @description 启动计时器
 */
function startTimer() {
    // 如果已经在运行，则不执行任何操作，防止创建多个计时器
    if (state.isRunning) return;

    // 只有在初始化的时候才修改倒计时/正计时模式
    if (state.isInit) {
        state.isCountdown = state.timeInSeconds > 0;
        state.isInit = false;
        // 且打开睡眠锁, 防止休眠
        noSleep.enable();
    }

    state.isRunning = true;
    // 设置定时器，每1000毫秒（1秒）执行一次 tick 函数
    state.timerId = setInterval(tick, 1000);
    // 更新按钮文本
    stopBtn.textContent = "暂停";
}

/**
 * @description 停止/暂停计时器
 */
function stopTimer() {
    clearInterval(state.timerId); // 清除定时器
    state.isRunning = false;
}

/**
 * @description 重置计时器
 */
function resetTimer() {
    noSleep.disable();
    stopTimer();
    state.timeInSeconds = 0;
    state.isInit = true;
    updateDisplay();
    // 重置按钮文本
    stopBtn.textContent = "暂停";
}

// --- 事件监听器绑定 ---

// "开始"按钮点击事件
startBtn.onclick = startTimer;

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
    text = minutesElement.textContent + ':' + secondsElement.textContent
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