let audio = null;
let isPlay = true

const addNum = ["./asset/sounds/AddOrLessNumber.wav"]
const buttonDown = ["./asset/sounds/ButtonDown.wav"]
const buttonUp = ["./asset/sounds/ButtonUp.wav"]
const catDown = ["./asset/sounds/CatDown-01.wav", "./asset/sounds/CatDown-02.wav", "./asset/sounds/CatDown-03.wav"]
const catUp = ["./asset/sounds/CatUp-01.wav", "./asset/sounds/CatUp-02.wav", "./asset/sounds/CatUp-03.wav"]
const catComplete = ["./asset/sounds/Complete.mp3"]

function playRandomSoundFromFiles(files) {
    if (isPlay) {
        const src = files[Math.floor(Math.random() * files.length)];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio = new Audio(src);
        audio.currentTime = 0;
        audio.play();
    }
}

document.querySelector("#noPlay").addEventListener("click", () => {
    if (isPlay) {
        isPlay = false
        document.querySelector("#noPlay").textContent = "已经静音啦"

    } else {
        isPlay = true
        document.querySelector("#noPlay").textContent = "点击我静音~"
    }
})
