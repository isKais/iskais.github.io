/* 系统：[时间系统] */
class TimeSystem {
    /* 构造方法 */
    constructor() {
        //改变this的指向（指向当前这个TimeSystem的对象）
        let timerOnTick = this.TimerOnTick.bind(this);
        //启动定时器（每隔1秒，调用1次）
        window.setInterval(timerOnTick, 1000);
    }
    /* 私有方法 */
    /* 定时器的 触发方法：
       (每隔1秒，调用1次 这个方法)
       当定时器每次达到间隔时间时，都会触发一次这个方法*/
        TimerOnTick() {
        if (TimerApp.Datas.currentState != StateType.Run)
            return;

        // 正计时逻辑
        if (TimerApp.Datas.iscountup) {
            TimerApp.Datas.currentTime.AddOrRemoveTime(1);  // 加1秒
            TimerApp.Uis.CountdownUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());

            // 正计时没有固定上限，设置一个最大时间防止无限加(99:59)
            const maxSeconds = 5999; // 99*60 + 59
            if (TimerApp.Datas.currentTime.TimeToSeconds() >= maxSeconds) {
                TimerApp.Datas.currentState = StateType.Stop;
                TimerApp.Uis.CountdownUi.OpenOrCloseCompleteTip(true);
            }

            // 更新标题为经过时间百分比或提示“正计时中”
            document.title = "Easy Cat Timer - [计时中]";
            return;
        }

        // 原来的倒计时逻辑
        if (TimerApp.Datas.currentTime.TimeToSeconds() <= 0) {
            TimerApp.Datas.currentState = StateType.Stop;
            TimerApp.Uis.CountdownUi.OpenOrCloseCompleteTip(true);
        } else {
            TimerApp.Datas.currentTime.AddOrRemoveTime(-1);
            TimerApp.Uis.CountdownUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());

            let _progress = TimerApp.Datas.currentTime.TimeToSeconds() / TimerApp.Datas.inputTime.TimeToSeconds();
            _progress = 100 - Math.floor(_progress * 100);
            _progress = Tools.ClampNumber(_progress, 0, 100);
            document.title = "Easy Cat Timer - [" + _progress + "%]";
        }
    }
}
