const startBtn = document.querySelector(".start-btn");
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

function init() {
    startBtn.addEventListener("click", startCompass);

    if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
}

function startCompass() {
    if (isIOS) {
    DeviceOrientationEvent.requestPermission()
        .then((response) => {
        if (response === "granted") {
            window.addEventListener("deviceorientation", handler, true);
        } else {
            alert("has to be allowed!");
        }
        })
        .catch(() => alert("not supported"));
    }
}

function handler(e) {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    compass = Math.trunc(compass);
    //compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
    document.querySelector("#bearing").innerHTML = compass.toString();

    if (compass > 0 && compass < 100) {
        document.body.style.backgroundColor = "lightyellow";
    } else if (compass > 100 && compass < 200) {
        document.body.style.backgroundColor = "lightblue";
    } else if (compass > 200) {
        document.body.style.backgroundColor = "lightgreen";
    }
}

init();