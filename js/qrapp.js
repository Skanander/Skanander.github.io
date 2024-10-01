const slideLayout = ["intro", "stol", "kata"];

const html5QrCode = new Html5Qrcode("reader");

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    for (let i=0; i<slideLayout.length; i++) {
        if (slideLayout[i] == decodedText) {
            Reveal.slide(i);
        }
    }
    html5QrCode.stop().then((ignore) => {
      }).catch((err) => {
        // Stop failed, handle it.
      });
};

const config = { fps: 10, qrbox: { width: 250, height: 250 } };

document.querySelector("#reader-btn").onclick = function() {
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
}