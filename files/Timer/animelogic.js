// 设计思路, 计时就是猫猫含着鱼, 
// 就是抬起猫猫就是带着鱼线闭着嘴, hold住猫猫就是打开菜单
// 打开菜单就是把鱼展示出来, 要退出了吗. 

let cats_control = false // 没有启动定时前, 猫猫不可交互, 可以使用state.isrunning

const cats = document.querySelectorAll(".cat");


function init_timer() {

    cats.forEach(cat => {
        gsap.set(".cat", { y: 126, scale: 1 });
        gsap.set(".cat-rope", { opacity: 0 })
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
                { scale: 0.9, rotation: -2, duration: 0.2, ease: "power1.inOut" },
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
        if (index === 0) {
            cat._eatTL
                .set(openMouth, { opacity: 0 })
                .set(closeMouth, { opacity: 1 })
                .set("#yellow-cat .cat-rope", { opacity: 1 })
                .to(cat, { y: 0 })
                .to(unit, { y: -30 }, "<")
        } else {
            cat._eatTL
                .set(openMouth, { opacity: 0 })
                .set(closeMouth, { opacity: 1 })
                .set("#black-cat .cat-rope", { opacity: 1 })
                .to(cat, { y: 0 })
                .to(unit, { y: -30 }, "<")
        }



        cat._showTL = gsap.timeline({ paused: true, defaults: { duration: 0 } });
        if (index === 0) {
            cat._showTL
                .set(openMouth, { opacity: 1 })
                .set(closeMouth, { opacity: 0 })
                .set(fish, { opacity: 1 })
                .to("#yellow-cat .cat-rope", { opacity: 1, top: "-175px", left: "155px" })
                .to(cat, { y: 0 })
                .to(unit, { y: -30 }, "<")
        } else {
            cat._showTL
                .set(openMouth, { opacity: 1 })
                .set(closeMouth, { opacity: 0 })
                .set(fish, { opacity: 1 })
                .to("#black-cat .cat-rope", { opacity: 1, top: "-177px", left: "120px" })
                .to(cat, { y: 0 })
                .to(unit, { y: -30 }, "<")
        }


        cat.addEventListener("mouseenter", () => {
            playRandomSoundFromFiles(catUp);
            if (window.state.isRunning) {
                cat._eatTL.play()
            } else cat._hoverTl.play()
        }
        );
        cat.addEventListener("mouseleave", () => {
            playRandomSoundFromFiles(catDown);
            if (window.state.isRunning) {
                cat._eatTL.reverse()
            } else cat._hoverTl.reverse()
        }
        );
        cat.addEventListener("mousedown", () => {
            playRandomSoundFromFiles(buttonDown);
            if (window.state.isRunning) {
                cat._showTL.play()
                // gsap.delayedCall(5, () => {
                //     cat._showTL.reverse();
                // });
            }
        })
        cat.addEventListener("mouseup", () => {
            playRandomSoundFromFiles(buttonUp);
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
// 元素登场和退场动画
// 登场：蹦出
function enterAnimation(el, duration = 0.8) {
    // 确保元素可见

    el.style.display = "block";
    gsap.fromTo(el,
        { scale: 0.8, opacity: 0 },
        {
            scale: 1.2,
            opacity: 1,
            duration: 0.2,
            ease: "elastic.out(1.2,0.2)",
        }
    );
    playRandomSoundFromFiles(catUp);
    gsap.to(el, {
        scale: 1,
        duration: 0.2,
        delay: 0.4,
        ease: "power2.out"
    });
}

// 退场：擦除并隐藏
function exitAnimation(el, delay = 0, duration = 0.8) {
    playRandomSoundFromFiles(catDown);
    // gsap.to(el,
    //     {
    //         opacity: 0,
    //         duration: 2.5,
    //         ease: "steps(6)",
    //         delay: delay,
    //         onComplete: () => {
    //             el.style.display = "none"; // 隐藏且不占位
    //         }
    //     }
    // );
    el.style.display = "none"; // 隐藏且不占位
}

init_timer()
cat()

// 防止拖拽影响动画
document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
});

// 动画的注
// gsap.set() 瞬间设置样式，不带动画。
// gsap.to() 把元素动画到to里面设置的位置
// gsap.from() 把元素从from里面设定的位置开始, 动画到起初的状态。
// gsap.fromTo() 自由设定位置, from作为起点, to作为重点