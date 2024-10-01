const slideLayout = ["intro", "stol", "kata"];

const html5QrCode = new Html5Qrcode("reader");

let cameraOn = false;

const readerBtn = document.querySelector("#reader-btn");
const qrIcon = `<img src="assets/qr.png" width="24" height="24" />`;
const xIcon  = `<img src="assets/close.png" width="24" height="24" />`;

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    for (let i=0; i<slideLayout.length; i++) {
        if (slideLayout[i] == decodedText) {
            Reveal.slide(i);
        }
    }
    html5QrCode.stop().then((ignore) => {
        // Stopped
        cameraOn = false;
        readerBtn.innerHTML = qrIcon;
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