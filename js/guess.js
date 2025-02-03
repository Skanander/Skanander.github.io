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
    
    let firstRound = true;

    // Question objects
    let questions = [
        bear = {
            answerImage: "assets/guess/bear.jpg",
            questionImage: "assets/guess/bear.jpg",
            name: "Björn",
        },
        hare = {
            answerImage: "assets/guess/hare.jpg",
            questionImage: "assets/guess/hare.jpg",
            name: "Hare",
        },
        owl = {
            answerImage: "assets/guess/owl.jpg",
            questionImage: "assets/guess/owl.jpg",
            name: "Uggla",
        },
        fox = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Räv",
        },
        deer = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Rådjur",
        },
        moose = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Älg",
        },
        forestMouse = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Skogsmus",
        },
        squirrel = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Ekorre",
        },
        wolf = {
            answerImage: "assets/guess/fox.jpg",
            questionImage: "assets/guess/fox.jpg",
            name: "Varg",
        },
    ];

    let askedQuestions = [];

    this.init = function() {
        btnStart.onclick = this.start;
        //btnNext.onclick = this.next();
    }

    this.start = function() {
        if (askedQuestions.length === questions.length) {
            window.location.reload();
        } else {
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
                startScreen.style.display = "none";
                questionScreen.style.display = "flex";
                answerScreen.style.display = "grid";
                firstRound = false;
            } else {
                // Reset colors
                for (let i=0; i<answerCards.length; i++) {
                    answerCards[i].style.cssText = "background-color: white;";
                }
            }

            self.setupAnswers(question);
        }
    }

    this.setupAnswers = function(question) {
        let answers = structuredClone(questions);
        answers = answers.filter(function(item) { return item.name != question.name; });
        self.shuffle(answers);
        answers.length = 3;
        answers.push(question);
        self.shuffle(answers);
        console.log(answers);
        console.log(answerCards);
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
            setTimeout(self.start, 1000);
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

}

document.addEventListener("DOMContentLoaded", (event) => {
    let guessingGame = new GuessingGame();
    guessingGame.init();
});