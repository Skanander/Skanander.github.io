function GuessingGame() {
    
    let self = this;
    let btnStart = document.getElementById("startGame");
    let btnNext  = document.getElementById("nextGame");
    let startScreen = document.getElementById("start");
    let questionScreen = document.getElementById("question");
    let answerScreen = document.getElementById("answer");
    let nextScreen = document.getElementById("next");
    let questionImage = document.getElementById("q-img");
    let answerCards = document.querySelectorAll(".answer-single");
    let questionIcon = document.getElementById("q-icon");
    let questionTrivia = document.getElementById("q-trivia");
    
    let firstRound = true;

    // Question objects
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

    let askedQuestions = [];

    this.init = function() {
        btnStart.onclick = function() {
            btnStart.disabled = true;
            setTimeout(self.start, 500);
        }
        btnNext.onclick = this.next;
    }

    this.start = function() {
        btnNext.disabled = false;
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
        questionImage.classList.add("in");

        if (firstRound === true) {
            startScreen.style.display = "none";
            questionScreen.style.display = "flex";
            answerScreen.style.display = "grid";
            firstRound = false;
            self.zoom([questionScreen, nextScreen, answerScreen], false);
        } else {
            // Reset colors
            for (let i=0; i<answerCards.length; i++) {
                answerCards[i].style.cssText = "background-color: white;";
            }
            self.zoom([nextScreen, answerScreen], true);
        }

        self.setupAnswers(question);
    }

    this.next = function() {
        if (askedQuestions.length === questions.length) {
            window.location.reload();
        }
        btnNext.disabled = true;
        questionImage.classList.remove("in");
        setTimeout(function() {
            self.start();
            questionIcon.innerHTML = "?";
        }, 500);
    }

    this.setupAnswers = function(question) {
        let answers = structuredClone(questions);
        answers = answers.filter(function(item) { return item.name != question.name; });
        self.shuffle(answers);
        answers.length = 3;
        answers.push(question);
        self.shuffle(answers);
        for (let i=0; i<4; i++) {
            answerCards[i].querySelector(".answer-label-name").innerHTML = answers[i].name;
            answerCards[i].style.backgroundImage = "url('" + answers[i].answerImage + "')";
            //answerCards[i].style.backgroundImage = "url('assets/guess/fox.jpg')";
            answerCards[i].onclick = function() {
                self.checkAnswer(question, answers[i], answerCards[i]);
            }
        }
    }

    this.checkAnswer = function(question, answer, element) {
        if (answer.name === question.name) {
            element.style.backgroundColor = "var(--green)";
            // Add answer to list of asked questions
            askedQuestions.push(answer);
            questionTrivia.innerHTML = answer.trivia;
            setTimeout(function() {
                if (nextScreen.style.display === "none") {
                    nextScreen.style.display = "flex";
                }
                questionIcon.innerHTML = "!";
                self.zoom([nextScreen, answerScreen], true);
            }, 500);
        } else {
            element.style.backgroundColor = "var(--red)";
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

    this.zoom = function(els, delay) {
        if (delay) {
            for (i=0; i<els.length; i++) {
                if (els[i].classList.contains("animate__zoomIn")) {
                    els[i].classList.remove("animate__zoomIn");
                    setTimeout(function(el) {
                        el.classList.add("animate__zoomOut");
                        el.style.visibility = "hidden";
                    }, 200, els[i]);
                } else {
                    els[i].classList.remove("animate__zoomOut");
                    setTimeout(function(el) {
                        el.classList.add("animate__zoomIn");
                        el.style.visibility = "visible";
                    }, 200, els[i]);
                }
            }
        } else {
            for (i=0; i<els.length; i++) {
                if (els[i].classList.contains("animate__zoomIn")) {
                    els[i].classList.remove("animate__zoomIn");
                    els[i].classList.add("animate__zoomOut");
                    els[i].style.visibility = "hidden";
                } else {
                    els[i].classList.remove("animate__zoomOut");
                    els[i].classList.add("animate__zoomIn");
                    els[i].style.visibility = "visible";
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    let guessingGame = new GuessingGame();
    guessingGame.init();
});