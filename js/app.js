window.addEventListener("DOMContentLoaded", async() => {
    const compass = new Compass();
    await compass.init();

    let heading = compass.getHeading();
    console.log(heading);

    setInterval( () => {
        heading = compass.getHeading();
        document.querySelector("#bearing").innerHTML = heading.toString();

        if (heading > 0 && heading < 100) {
            document.body.style.backgroundColor = "yellow";
        } else if (heading > 100 && heading < 200) {
            document.body.style.backgroundColor = "lightblue";
        } else if (heading > 200) {
            document.body.style.backgroundColor = "lightgreen";
        }

    }, 2000);
});