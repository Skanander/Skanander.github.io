const slideLayout = ["intro", "stol", "kata"];

const html5QrCode = new Html5Qrcode("reader");

let cameraOn = false;

const readerBtn = document.querySelector("#reader-btn");
const qrIcon = `<img src="assets/qr.png" width="24" height="24" />`;
const xIcon  = `<img src="assets/close.png" width="24" height="24" />`;

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    let hits = 0;
    let page = 0;
    for (let i=0; i<slideLayout.length; i++) {
        if (slideLayout[i] == decodedText) {
            hits++;
            page = i;
        }
    }
    if (hits === 0) {
        notifier.show('Fel!', 'Koden kunde inte matchas till något föremål i guiden.', 'danger', 'assets/error.png', 5000);
    } else if (hits > 1) {
        notifier.show('Fel!', 'Koden kunde matchas till fler än ett föremål i guiden.', 'danger', 'assets/error.png', 5000);
    } else {
        Reveal.slide(page);
    }
    html5QrCode.stop().then((ignore) => {
        // Stopped
        cameraOn = false;
        readerBtn.innerHTML = qrIcon;
        readerBtn.parentElement.classList.remove("move-to-center");
    }).catch((err) => {
        // Stop failed, handle it.
    });
};

const config = { fps: 10, qrbox: { width: 250, height: 250 } };

readerBtn.onclick = function() {
    if (!cameraOn) {
        cameraOn = true;
        readerBtn.innerHTML = xIcon;
        readerBtn.parentElement.classList.add("move-to-center");
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    } else {
        html5QrCode.stop().then((ignore) => {
            // Stopped
            cameraOn = false;
            readerBtn.parentElement.classList.remove("move-to-center");
            readerBtn.innerHTML = qrIcon;
        }).catch((err) => {
            // Stop failed, handle it.
        });
    }
}