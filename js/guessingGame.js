function GuessingGame() {
    const self = this;
    const triviaScreen = document.getElementById("triviaContainer");
    const triviaText = document.getElementById("triviaText");
    const questionImage = document.getElementById("questionImage");
    const answerCards = document.querySelectorAll(".answerButton");

    let questions = [
        bjorn = {
            answerImage: "assets/guess/bear.jpg",
            questionImage: "assets/guess/poop/bjorn.png",
            name: "Björn",
            trivia: "Björnen äter mest växter eller bär, men ibland äter den kött och spillningen blir då annorlunda.",
        },
        hare = {
            answerImage: "assets/guess/hare.webp",
            questionImage: "assets/guess/poop/hare.png",
            name: "Hare",
            trivia: "Trivia.",
        },
        fladdermus = {
            answerImage: "assets/guess/fladdermus.jpg",
            questionImage: "assets/guess/poop/fladdermus.png",
            name: "Fladdermus",
            trivia: "Trivia.",
        },
        rav = {
            answerImage: "assets/guess/rav.jpg",
            questionImage: "assets/guess/poop/rav.png",
            name: "Räv",
            trivia: "Trivia.",
        },
        radjur = {
            answerImage: "assets/guess/radjur.jpg",
            questionImage: "assets/guess/poop/radjur.png",
            name: "Rådjur",
            trivia: "Eftersom rådjur idisslar ser deras bajs nästan alltid likadant ut.",
        },
        alg = {
            answerImage: "assets/guess/alg.jpg",
            questionImage: "assets/guess/poop/alg.png",
            name: "Älg",
            trivia: "Eftersom älgar idisslar ser deras bajs nästan alltid likadant ut.",
        },
        skogsmus = {
            answerImage: "assets/guess/skogsmus.jpg",
            questionImage: "assets/guess/poop/skogsmus.png",
            name: "Skogsmus",
            trivia: "Trivia.",
        },
        tjader = {
            answerImage: "assets/guess/tjader.jpg",
            questionImage: "assets/guess/poop/tjader.png",
            name: "Tjäder",
            trivia: "Trivia.",
        },
        varg = {
            answerImage: "assets/guess/varg.jpg",
            questionImage: "assets/guess/poop/varg.png",
            name: "Varg",
            trivia: "Vargspillning är ganska lik hundars, men innehåller ofta hår.",
        },
        vildsvin = {
            answerImage: "assets/guess/vildsvin.jpg",
            questionImage: "assets/guess/poop/vildsvin.png",
            name: "Vildsvin",
            trivia: "Trivia.",
        },
        orre = {
            answerImage: "assets/guess/orre.jpg",
            questionImage: "assets/guess/poop/orre.png",
            name: "Orre",
            trivia: "Trivia.",
        },
        utter = {
            answerImage: "assets/guess/utter.jpg",
            questionImage: "assets/guess/poop/utter.png",
            name: "Utter",
            trivia: "Trivia.",
        },
        kanin = {
            answerImage: "assets/guess/kanin.jpg",
            questionImage: "assets/guess/poop/kanin.png",
            name: "Kanin",
            trivia: "Trivia.",
        },
    ];
    
    let firstRound = true;
    let askedQuestions = [];

    this.init = function() {
        console.log("init");
        self.start();
    }

    this.start = function() {
        let question;
        let foundQuestion = false;

        while (!foundQuestion) {
            question = self.randomQuestion(questions);
            console.log("Question", question);
            if (!self.checkAvailability(askedQuestions, question)) {
                foundQuestion = true;
            }
        }
        
        questionImage.src = question.questionImage;

        if (firstRound === true) {
            firstRound = false;
        } else {
            // Reset colors
            for (let i=0; i<answerCards.length; i++) {
                answerCards[i].style.backgroundColor = "var(--green-400)";
            }
        }
        self.setupAnswers(question);
    }

    this.next = function() {
        triviaScreen.onclick = void(0); // remove onclick behavior
        for (let i=0; i<answerCards.length; i++) {
            answerCards[i].style.opacity = "0";
        }
        animateCSS(triviaScreen, "slideOutUp").then(() => {
            triviaScreen.style.display = "none";
            if (askedQuestions.length === questions.length) {
                window.location.reload();
            } else {
                self.start();
            }
        });
    }

    this.setupAnswers = function(question) {
        let answers = structuredClone(questions);
        answers = answers.filter(function(item) { return item.name != question.name; });
        self.shuffle(answers);
        answers.length = 3;
        answers.push(question);
        self.shuffle(answers);
        for (let i=0; i<4; i++) {
            answerCards[i].querySelector(".answerName").innerHTML = answers[i].name;
            answerCards[i].querySelector(".answerImage").src = answers[i].answerImage;
            answerCards[i].onclick = function() {
                self.checkAnswer(question, answers[i], answerCards[i]);
            }
        }
        let x=0;
        let animateCards = setInterval(function() {
            console.log("opacity");
            answerCards[x].style.opacity = "1";
            x++;
            if (x > 3) {
                clearInterval(animateCards);
            }
        }, 500);
    }

    this.checkAnswer = function(question, answer, element) {
        if (answer.name === question.name) {
            element.onclick = void(0);
            animateCSS(element, "tada").then(() => {
                element.style.backgroundColor = "limegreen";
                // Add answer to list of asked questions
                askedQuestions.push(answer);
                triviaText.innerHTML = answer.trivia;
                triviaScreen.style.display = "flex";
                animateCSS(triviaScreen, "slideInDown").then(() => {
                    triviaScreen.onclick = self.next;
                });
            });
        } else {
            element.onclick = void(0);
            animateCSS(element, "headShake").then(() => {
                element.style.backgroundColor = "var(--red-500)";
            });
        }
    }

    this.randomQuestion = function(array) {
        let i = Math.floor(Math.random() * array.length);
        let r = array[i];
        return r;
    }

    this.shuffle = function(array) {
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

    this.checkAvailability = function(arr, val) {
        return arr.some(function (arrVal) {
            return val === arrVal;
        });
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = element;
  
      node.classList.add(`${prefix}animated`, animationName);
  
      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }
  
      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

document.addEventListener("DOMContentLoaded", (event) => {
    let guessingGame = new GuessingGame();
    guessingGame.init();

    let gameMenu = document.querySelector("#gameMenu");

    gameMenu.style.backgroundColor = "var(--green-400)"; //default

    // change menu color (5s transition)
    let colorChangeMenu = setInterval(function() {
        if (gameMenu.style.backgroundColor == "var(--green-400)" && !gameMenu.classList.contains("animate__animated")) {
            gameMenu.style.backgroundColor = "var(--red-400)";
        } else {
            gameMenu.style.backgroundColor = "var(--green-400)";
        }
    }, 10000);

    gameMenu.onclick = function() {
        this.classList.add("animate__animated", "animate__slideOutUp");
        this.querySelector(".backgroundBlend").style.opacity = "0";
        if (gameMenu.classList.contains("animate__animated")) {
            clearInterval(colorChangeMenu);
            console.log("gameMenu interval cleared");
        }
    }
});