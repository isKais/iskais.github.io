let timerId = null; // 保存 setInterval 的 ID
let running = false; // 记录状态

document.querySelector("#clock").onclick = function () {
    if (!running) {
        // 开始计时
        this.textContent = "回到计时器"
        timerId = setInterval(() => {
            const now = new Date(); // 每次取当前时间
            minutesElement.textContent = String(now.getHours()).padStart(2, "0");
            secondsElement.textContent = String(now.getMinutes()).padStart(2, "0");
        }, 1000);
        running = true;
    } else {
        this.textContent = "当前时间"
        // 停止并重置
        clearInterval(timerId);
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        running = false;
    }
};