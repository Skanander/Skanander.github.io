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

    if (compass > 155 && compass < 200) {
        document.body.style.backgroundColor = "lightred";
        document.querySelector("#bearing").innerHTML = "KATA \n" + compass.toString();
    } else if (compass > 225 && compass < 265) {
        document.body.style.backgroundColor = "lightred";
        document.querySelector("#bearing").innerHTML = "KISTA \n" + compass.toString();
    } else if (compass > 300 && compass < 330) {
        document.body.style.backgroundColor = "lightred";
        document.querySelector("#bearing").innerHTML = "KYRKA \n" + compass.toString();
    } else if (compass > 85 && compass < 115) {
        document.body.style.backgroundColor = "lightred";
        document.querySelector("#bearing").innerHTML = "STOL \n" + compass.toString();
    } else if (compass > 115 && compass < 135) {
        document.body.style.backgroundColor = "lightred";
        document.querySelector("#bearing").innerHTML = "FYND \n" + compass.toString();
    } else {
        document.body.style.backgroundColor = "white";
    }
}

init();