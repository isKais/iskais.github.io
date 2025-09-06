let timerId = null; // 保存 setInterval 的 ID
let running = false; // 记录状态
let timerData;  // 用于保存计时器数据
let temp = {
    minutes: '00',
    seconds: '00',
};

document.querySelector("#clock").onclick = function () {
    if (!running) {
        // 开始计时
        // 保存数据
        timerData = window.state
        window.state.clock = true
        temp.minutes = minutesElement.textContent
        temp.seconds = secondsElement.textContent

        this.textContent = "回到计时器"
        timerId = setInterval(() => {
            const now = new Date(); // 每次取当前时间
            // 使用表盘的分钟显示小时, 使用秒钟显示分钟, 复用
            minutesElement.textContent = String(now.getHours()).padStart(2, "0");
            secondsElement.textContent = String(now.getMinutes()).padStart(2, "0");
        }, 2000);
        running = true;
    } else {
        window.state = timerData
        window.state.clock = false
        this.textContent = "Clock"
        // 停止并重置
        clearInterval(timerId);
        minutesElement.textContent = temp.minutes;
        secondsElement.textContent = temp.seconds;
        running = false;
    }
};