const slideLayout = ["intro", "stol", "kata"];

const html5QrCode = new Html5Qrcode("reader");

let cameraOn = false;

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
    }).catch((err) => {
        // Stop failed, handle it.
    });
};

const config = { fps: 10, qrbox: { width: 250, height: 250 } };

document.querySelector("#reader-btn").onclick = function() {
    if (!cameraOn) {
        cameraOn = true;
        this.innerHTML = xIcon;
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    } else {
        html5QrCode.stop().then((ignore) => {
            // Stopped
            cameraOn = false;
            document.querySelector("#reader-btn").innerHTML = qrIcon;
        }).catch((err) => {
            // Stop failed, handle it.
        });
    }
}