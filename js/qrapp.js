const html5QrCode = new Html5Qrcode("reader");

const readerBtn = document.querySelector("#reader-btn");
const qrIcon = `<img src="assets/qrWhite.png" width="24" height="24" alt="QR-kod" />`;
const xIcon  = `<img src="assets/closeWhite.png" width="24" height="24" alt="Stäng" />`;

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    let hits = 0;
    let page = 0;
    for (let i=0; i<slideLayout.length; i++) {
        if (slideLayout[i].toLowerCase() === decodedText.toLowerCase()) {
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
        let msg = decodedText.charAt(0).toUpperCase() + decodedText.slice(1); //Capitalize first letter in case QR-code was written poorly
        notifier.show('Kod läst', 'Avsnitt: ' + msg, 'success', 'assets/check.png', 3000);
    }
    html5QrCode.stop().then((ignore) => {
        // Stopped
        readerBtn.innerHTML = qrIcon;
        readerBtn.parentElement.classList.remove("move-to-center");
        document.removeEventListener('click', disableMouseClick, true);
    }).catch((err) => {
        // Stop failed, handle it.
        console.log(err);
    });
};

const config = { fps: 30, qrbox: { width: 250, height: 250 } };

readerBtn.onclick = function() {
    if (!html5QrCode.isScanning) {
        document.addEventListener('click', disableMouseClick, true);
        readerBtn.innerHTML = xIcon;
        readerBtn.parentElement.ariaLabel = "Stäng QR-läsaren";
        readerBtn.parentElement.classList.add("move-to-center");
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .catch((err) => {
            if (err.search("NotAllowedError")) {
                notifier.show('Fel!', 'QR-läsaren behöver tillåtelse att använda kameran. Om du vill använda QR-läsaren behöver du ge behörighet till sidan att använda kameran och prova igen.', 'danger', 'assets/error.png', 8000);
                readerBtn.innerHTML = qrIcon;
                readerBtn.parentElement.ariaLabel = "Starta QR-läsaren";
                readerBtn.parentElement.classList.remove("move-to-center");
                document.removeEventListener('click', disableMouseClick, true);
            }
        });
    } else {
        html5QrCode.stop().then((ignore) => {
            // Stopped
            readerBtn.innerHTML = qrIcon;
            readerBtn.parentElement.ariaLabel = "Starta QR-läsaren";
            readerBtn.parentElement.classList.remove("move-to-center");
            html5QrCode.clear();
            document.removeEventListener('click', disableMouseClick, true);
        }).catch((err) => {
            // Stop failed, handle it.
            console.log(err);
        });
    }
}

function disableMouseClick(event) {
    if (!html5QrCode.isScanning) {
        event.stopPropagation();
        event.preventDefault();
    }
}