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
});

let deck2 = new Reveal(document.querySelector('.deck2'), {
    embedded: true,
    keyboardCondition: 'focused',
});

let deck3 = new Reveal(document.querySelector('.deck3'), {
    embedded: true,
    keyboardCondition: 'focused',
});

let deck4 = new Reveal(document.querySelector('.deck4'), {
    embedded: true,
    keyboardCondition: 'focused',
});

let deck5 = new Reveal(document.querySelector('.deck5'), {
    embedded: true,
    keyboardCondition: 'focused',
});

let items = [
    {
        name: "Stol",
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
        name: "Kyrka",
        num: 300,
        color: "lightpink",
        deckNum: deck5,
        className: "deck5"
    }
];

function init() {
    startBtn.addEventListener("click", startCompass);
    bar = new ProgressBar.Circle(document.getElementById("progress"), {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 300,
        color: '#FFEA82',
        trailColor: 'transparent',
        trailWidth: 0,
        svgStyle: null
    });

    deck1.initialize();
    document.querySelector('.deck1').style.display = "block";
    currentDeck = deck1;

    if (!isIOS) {
        startBtn.parentElement.removeChild(startBtn);
        window.addEventListener("deviceorientationabsolute", handler, true);
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
    currentDeck.destroy();
    if (currentDeck == deck1) {
        document.getElementsByClassName("deck1")[0].style.display = "none";
    } else {
        document.getElementsByClassName(currentDeck.className)[0].style.display = "none";
    }
    t.deckNum.initialize();
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

init();