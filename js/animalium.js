let x;
let y;
let currentTarget = null;
let clone = null;

const questions = [
    giraffe = {
        name: "Kamelopard",
        imgSrc: "assets/animalium/giraffe.jpg",
        continent: "Afrika",
        latinName: "Giraffa camelopardalis"
    },
    rhino = {
        name: "Noshörning",
        imgSrc: "assets/animalium/rhino.jpg",
        continent: "Afrika",
        latinName: "Rhinocerotidae"
    },
];

function startDrag(e) {
  const target = e.target;
  
  if (target.tagName === 'P') {
    x = e.offsetX;
    y = e.offsetY;
    currentTarget = target;
  }
}

function cloneElement(e) {
  startDrag(e, true);
}

function moveElement(e) {
  startDrag(e, false);
}

function removeElement(e) { 
    e.remove();
}

function stickElement(e) { 
    const element = cloneElement ? currentTarget.cloneNode(true) : currentTarget;
    let score = 0;
    let children = this.childNodes;
    children.forEach((child) => {
        if (child.dataset.name && element.dataset.name) {
            if (!document.getElementById("labels").querySelector("[data-name='" + child.dataset.name + "']")) {
                let replacementLabel = cloneElement ? child.cloneNode(true) : child;
                document.getElementById("labels").appendChild(replacementLabel);
            }
            child.remove();
        }
        if (child.dataset.latinName && element.dataset.latinName) {
            if (!document.getElementById("labels").querySelector("[data-name='" + child.dataset.latinName + "']")) {
                const replacementLabel = cloneElement ? child.cloneNode(true) : child;
                document.getElementById("labels").appendChild(replacementLabel);
            }
            child.remove();
        }
        if (child.dataset.continent && element.dataset.continent) {
            if (!document.getElementById("labels").querySelector("[data-name='" + child.dataset.continent + "']")) {
                const replacementLabel = cloneElement ? child.cloneNode(true) : child;
                document.getElementById("labels").appendChild(replacementLabel);
            }
            child.remove();
        }
    });

    this.appendChild(element);
    removeElement(currentTarget);
    currentTarget = null;

    // Scoring
    children.forEach((child) => {
        if (child.dataset.name === this.dataset.name) {
            score++;
        }
        if (child.dataset.latinName === this.dataset.latinName) {
            score++;
        }
        if (child.dataset.continent === this.dataset.continent) {
            score++;
        }
        console.log(child, score);
    });

    this.querySelector(".score").textContent = score + " / 3";
    if (score === 3) {
        lockAnswer(this);
    }
}

function allowDrag(e) {
  e.preventDefault();
}

function lockAnswer(element) {
    element.removeEventListener('drop', stickElement);
}

function generateLabels() {
    for (let i=0; i<questions.length; i++) {
        let name = labels.appendChild(document.createElement("p"));
        let latinName = labels.appendChild(document.createElement("p"));
        name.dataset.name = questions[i].name;
        name.textContent = questions[i].name;
        latinName.dataset.latinName = questions[i].latinName;
        latinName.textContent = questions[i].latinName;
        let continent = labels.appendChild(document.createElement("p"));
        continent.dataset.continent = questions[i].continent;
        continent.textContent = questions[i].continent;
        
    }
    let generatedLabels = labels.querySelectorAll("p");
    shuffleArray(generatedLabels);
    generatedLabels.forEach((label) => {
        label.draggable = true;
        label.style.order = getRandomInt(100).toString();
    });
}

function generateAnswers() {
    for (let i=0; i<questions.length; i++) {
        let newTarget = document.querySelector(".drag-target-wrapper").appendChild(document.createElement("div"));
        newTarget.classList.add("drag-target");
        newTarget.style.backgroundImage = 'url("' + questions[i].imgSrc + '")';
        newTarget.dataset.name = questions[i].name;
        newTarget.dataset.latinName = questions[i].latinName;
        newTarget.dataset.continent = questions[i].continent;
        newTarget.dataset.score = 0;
        let score = newTarget.appendChild(document.createElement("div"));
        score.classList.add("score");
        score.textContent = "0 / 3";
    }
}

function shuffleArray(array) {
    let currentIndex = array.length;
        
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


document.addEventListener("DOMContentLoaded", (event) => {
    generateLabels();
    generateAnswers();

    // Bind event listeners:

    const labels = document.getElementById('labels');
    const targets = document.querySelectorAll('.drag-target');

    document.addEventListener('dragenter', allowDrag);
    document.addEventListener('dragover', allowDrag);

    labels.addEventListener('dragstart', moveElement);
    labels.addEventListener('drop', removeElement);

    targets.forEach((target) => {
        console.log(target);
        target.addEventListener('dragstart', cloneElement);
        target.addEventListener('drop', stickElement);
    });
  });

