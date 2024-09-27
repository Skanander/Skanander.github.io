const startBtn = document.querySelector(".start-btn");
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

let target = null;
let lastTarget = "";
let compass = 0;
let limit = 10;
let ticks = 0;

let items = [
    {
        name: "Stol",
        num: 120,
        color: "wheat"
    },
    {
        name: "Kata",
        num: 190,
        color: "lightyellow"
    },
    {
        name: "Kista",
        num: 250,
        color: "lightblue"
    },
    {
        name: "Kyrka",
        num: 300,
        color: "lightpink"
    }
];

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

const clock = setInterval(function() {
    if (target.name != lastTarget) {
        ticks++;
        if (ticks >= 10) {
            printItem(target);
            lastTarget = target.name;
        }
    } else {
        ticks = 0;
    }
}, 300);

function handler(e) {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    compass = Math.trunc(compass);
    target = getClosest(items, compass);
    if (lastTarget == "") {
        lastTarget = target.name;
    }
    document.getElementById("console").innerHTML = " Targeting " + target.name + " at bearing " + compass.toString();
}

function printItem(t) {
    document.querySelector("#bearing").innerHTML = t.name;
    document.body.style.backgroundColor = t.color;
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const getClosest = (data, target) => 
    data.reduce((acc, obj) =>
       Math.abs(target - obj.num) < Math.abs(target - acc.num) ? obj : acc
    );

init();