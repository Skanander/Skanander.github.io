function GuessingGame() {
    const self = this;

    this.init = function() {
        console.log("init");
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