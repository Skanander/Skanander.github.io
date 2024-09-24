window.addEventListener("DOMContentLoaded", async() => {
    const compass = new Compass();
    await compass.init();

    let heading = compass.getHeading();
    console.log(heading);

    setInterval( () => {
        heading = compass.getHeading();
        document.querySelector("#bearing").innerHTML = heading.toString();
    }, 2000);
});