function GuessingGame() {
    
    let self = this;
    let btnStart = document.getElementById("startGame");
    let btnNext  = document.getElementById("nextGame");
    let startScreen = document.getElementById("start");
    let questionScreen = document.getElementById("question");
    let answerScreen = document.getElementById("answer");
    let nextScreen = document.getElementById("next");
    let questionImage = document.getElementById("questionImage");
    let answerCards = document.querySelectorAll(".answer-single");

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

    this.init = function() {
        btnStart.onclick = this.start;
        //btnNext.onclick = this.next();
    }

    this.start = function() {
        let question = self.randomQuestion(questions);
        questionImage.src = question.questionImage;

        startScreen.style.display = "none";
        questionScreen.style.display = "flex";
        answerScreen.style.display = "flex";

        self.setupAnswers(question);
    }

    this.setupAnswers = function(question) {
        // Remove correct answer
        let possibleAnswers = questions;
        const index = possibleAnswers.indexOf(question);
        if (index > -1) { // only splice array when item is found
            possibleAnswers.splice(index, 1); // 2nd parameter means remove one item only
        }

        // Randomize remaining
        self.shuffle(possibleAnswers);

        // Remove all but first 3
        possibleAnswers.length = 3;

        // Add answer
        possibleAnswers.push(question);

        // Shuffle
        self.shuffle(possibleAnswers);

        // Insert
        for (let i=0; i<4; i++) {
            answerCards[i].querySelector(".answer-image-container").style.cssText = 'background-image: url("' + possibleAnswers[i].answerImage + '");';
            answerCards[i].querySelector(".answer-label-name").innerHTML = possibleAnswers[i].name;
            answerCards[i].onclick = function() {
                self.checkAnswer(question, possibleAnswers[i], answerCards[i]);
            }
        }
    }

    this.checkAnswer = function(question, answer, element) {
        if (answer.name === question.name) {
            element.style.cssText = "background: var(--green);";
        } else {
            element.style.cssText = "background: var(--red);";
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
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

}

document.addEventListener("DOMContentLoaded", (event) => {
    let guessingGame = new GuessingGame();
    guessingGame.init();
});