const startBtn = document.getElementById("start-btn");
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

let target = null;
let lastTarget = "";
let compass = 0;
let limit = 10;
let ticks = 0;
let barAnimationCounter = 0;
let bar;
let currentDeck;
let lastDeck;

// Reveal decks

let deck1 = new Reveal(document.querySelector('.deck1'), {
    embedded: true,
    keyboardCondition: 'focused',
    hash: true,
    scrollActivationWidth: null,
    backgroundTransition: "fade",
    transition: "fade",
    width: 600,
    height: 960,
    margin: 0,
    center: false,
    minScale: 1,
    maxScale: 1,
    disableLayout: true,
});

let deck2 = new Reveal(document.querySelector('.deck2'), {
    embedded: true,
    keyboardCondition: 'focused',
    hash: true,
    scrollActivationWidth: null,
    backgroundTransition: "fade",
    transition: "fade",
    width: 600,
    height: 960,
    margin: 0,
    center: false,
    minScale: 1,
    maxScale: 1,
    disableLayout: true,
});

let deck3 = new Reveal(document.querySelector('.deck3'), {
    embedded: true,
    keyboardCondition: 'focused',
    hash: true,
    scrollActivationWidth: null,
    backgroundTransition: "fade",
    transition: "fade",
    width: 600,
    height: 960,
    margin: 0,
    center: false,
    minScale: 1,
    maxScale: 1,
    disableLayout: true,
});

let deck4 = new Reveal(document.querySelector('.deck4'), {
    embedded: true,
    keyboardCondition: 'focused',
    hash: true,
    scrollActivationWidth: null,
    backgroundTransition: "fade",
    transition: "fade",
    width: 600,
    height: 960,
    margin: 0,
    center: false,
    minScale: 1,
    maxScale: 1,
    disableLayout: true,
});

let deck5 = new Reveal(document.querySelector('.deck5'), {
    embedded: true,
    keyboardCondition: 'focused',
    hash: true,
    scrollActivationWidth: null,
    backgroundTransition: "fade",
    transition: "fade",
    width: 600,
    height: 960,
    margin: 0,
    center: false,
    minScale: 1,
    maxScale: 1,
    disableLayout: true,
});

let items = [
    {
        name: "Suntakstolen",
        num: 120,
        color: "wheat",
        deckNum: deck2,
        className: "deck2"
    },
    {
        name: "Kata",
        num: 190,
        color: "lightyellow",
        deckNum: deck3,
        className: "deck3"
    },
    {
        name: "Kista",
        num: 250,
        color: "lightblue",
        deckNum: deck4,
        className: "deck4"
    },
    {
        name: "Modell av kyrka",
        num: 300,
        color: "lightpink",
        deckNum: deck5,
        className: "deck5"
    }
];

function init() {
    if (isMobile()) {
        startBtn.addEventListener("click", startCompass);
        bar = new ProgressBar.Circle(document.getElementById("progress"), {
            strokeWidth: 6,
            easing: 'easeInOut',
            duration: 100,
            color: '#FFEA82',
            trailColor: 'transparent',
            trailWidth: 0,
            svgStyle: null
        });
        deck1.initialize();
        document.querySelector('.deck1').style.display = "block";
        deck2.initialize();
        deck3.initialize();
        deck4.initialize();
        deck5.initialize();
        currentDeck = deck1;

        if (!isIOS) {
            startBtn.parentElement.removeChild(startBtn);
            window.addEventListener("deviceorientationabsolute", handler, true);
        }

        const clock = setInterval(function() {
            if (target.name != lastTarget) {
                ticks++;
                barAnimationCounter += .1;
                bar.animate(barAnimationCounter);
                if (ticks >= 10) {
                    printItem(target);
                    lastTarget = target.name;
                    barAnimationCounter = 0;
                    bar.animate(barAnimationCounter);
                }
            } else {
                barAnimationCounter = 0;
                bar.animate(barAnimationCounter);
                ticks = 0;
            }
        }, 200);
    } else {
        document.querySelector('#console').innerHTML = "<span style='color:black;'>Den här bildguiden är endast tillgänglig på mobila enheter.</span>";
    }
}

function startCompass() {
    if (isIOS) {
    DeviceOrientationEvent.requestPermission()
        .then((response) => {
        if (response === "granted") {
            startBtn.parentElement.removeChild(startBtn);
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
    target = getClosest(items, compass);
    if (lastTarget == "") {
        lastTarget = target.name;
    }
    document.getElementById("console").innerHTML = "Föremål: " + target.name + " vid " + compass.toString();
}

function printItem(t) {
    if (currentDeck == deck1) {
        document.getElementsByClassName("deck1")[0].style.display = "none";
    } else {
        for (var i=0; i<items.length; i++) {
            if (items[i].deckNum == currentDeck) {
                document.getElementsByClassName(items[i].className)[0].style.display = "none";
            }
        }
    }
    document.getElementsByClassName(t.className)[0].style.display = "block";
    currentDeck = t.deckNum;
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const getClosest = (data, target) => 
    data.reduce((acc, obj) =>
       Math.abs(target - obj.num) < Math.abs(target - acc.num) ? obj : acc
    );

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

init();