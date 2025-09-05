// 设计思路, 计时就是猫猫含着鱼, 
// 就是抬起猫猫就是带着鱼线闭着嘴, hold住猫猫就是打开菜单
// 打开菜单就是把鱼展示出来, 要退出了吗. 

let cats_control = false // 没有启动定时前, 猫猫不可交互, 可以使用state.isrunning

const cats = document.querySelectorAll(".cat");


function init_timer() {

    cats.forEach(cat => {
        gsap.set(".cat", { y: 126, scale: 1 });
    })
}

function cat() {
    cats.forEach((cat, index) => {
        const openMouth = cat.querySelector(".cat-openmouth");
        const closeMouth = cat.querySelector(".cat-closemouth");
        const fish = cat.querySelector(".cat-fish");

        gsap.to(fish, {
            keyframes: [
                { scale: 1.1, rotation: 2, duration: 0.2, ease: "power1.out" },
                { scale: 0.95, rotation: -2, duration: 0.2, ease: "power1.inOut" },
                { scale: 1.0, rotation: 0, duration: 0.2, ease: "power1.out" },
            ],
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.3
        });

        let unit;

        if (index === 0) {
            unit = document.querySelector("#minutes");
        } else unit = document.querySelector("#seconds");

        cat._hoverTl = gsap.timeline({ paused: true, defaults: { duration: 0.2, ease: "power3.out" } });
        cat._hoverTl
            .to(cat, { y: 0 })
            .to(unit, { y: -30 }, "<")

        cat._eatTL = gsap.timeline({ paused: true, defaults: { duration: 0.2, ease: "power3.out" } });
        cat._eatTL
            .set(openMouth, { opacity: 0 })
            .set(closeMouth, { opacity: 1 })
            .to(cat, { y: 0 })
            .to(unit, { y: -30 }, "<")

        cat._showTL = gsap.timeline({ paused: true, defaults: { duration: 0 } });
        cat._showTL
            .set(openMouth, { opacity: 1 })
            .set(closeMouth, { opacity: 0 })
            .set(fish, { opacity: 1 })
            .to(cat, { y: 0 })
            .to(unit, { y: -30 }, "<")

        cat.addEventListener("mouseenter", () => {
            if (window.state.isRunning) {
                cat._eatTL.play()
            } else cat._hoverTl.play()
        }
        );
        cat.addEventListener("mouseleave", () => {
            if (window.state.isRunning) {
                cat._eatTL.reverse()
            } else cat._hoverTl.reverse()
        }
        );
        cat.addEventListener("mousedown", () => {
            if (window.state.isRunning) {
                cat._showTL.play()
                // gsap.delayedCall(5, () => {
                //     cat._showTL.reverse();
                // });
            }
        })
        cat.addEventListener("mouseup", () => {
            if (window.state.isRunning) {
                cat._showTL.reverse();
            }
        })


    })
    // 转发滚轮事件, 因为猫咪层在上, 所以没办法滚轮直接对着分钟秒钟修改, 所以给猫滚轮事件, 转发到下一层
    // 无奈之举
    document.querySelector("#yellow-cat").addEventListener("wheel", (e) => {
        e.preventDefault();
        const newEvent = new WheelEvent("wheel", {
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,   // 冒泡
            cancelable: true
        });
        minutesElement.dispatchEvent(newEvent);
    })
    document.querySelector("#black-cat").addEventListener("wheel", (e) => {
        e.preventDefault();
        const newEvent = new WheelEvent("wheel", {
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,   // 冒泡
            cancelable: true
        });
        secondsElement.dispatchEvent(newEvent);
    })
}

init_timer()
cat()



