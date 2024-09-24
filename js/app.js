window.addEventListener("DOMContentLoaded", async() => {
    const compass = new Compass();
    await compass.init();

    let bearingToNorth = compass.getBearingToNorth();
    console.log(bearingToNorth);

    setInterval( () => {
        bearingToNorth = compass.getBearingToNorth();
        document.querySelector("#bearing").innerHTML = bearingToNorth.toString();
    }, 100);
});