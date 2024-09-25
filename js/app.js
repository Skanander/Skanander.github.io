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

    let items = [
        {
            name: "",
            num: 0,
            color: "white"
        },
        {
            name: "Stol",
            num: 120,
            color: "lightred"
        },
        {
            name: "Fynd",
            num: 150,
            color: "lightgreen"
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

    setInterval(printItem, 3000, items, compass);
}

function printItem(items, compass) {
    let print = getClosest(items, compass);
    document.querySelector("#bearing").innerHTML = print.name;
    document.body.style.backgroundColor = print.color;
}

const getClosest = (data, target) => 
    data.reduce((acc, obj) =>
       Math.abs(target - obj.num) < Math.abs(target - acc.num) ? obj : acc
    );

init();