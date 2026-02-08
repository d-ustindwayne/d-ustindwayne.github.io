// Initialize all the media elements
/**@type HTMLDivElement */
const PBModal = document.getElementById("photobooth-modal");
/**@type HTMLDivElement */
const PBMedia = document.getElementById("photobooth-media");
/**@type HTMLDivElement */
const PBButtons = document.getElementById("photobooth-buttons");

/**@type HTMLVideoElement */
const Camera = document.getElementById("camera");
/**@type HTMLCanvasElement */
const Canvas = document.getElementById("resultCanvas");
const ctx = Canvas.getContext("2d");

/**@type HTMLImageElement */
const Output = document.getElementById("resultOutput");

// Initialize all the button elements
/**@type HTMLButtonElement */
const takeButton = document.getElementById("take-photo");
/**@type HTMLButtonElement */
const retakeButton = document.getElementById("retake-photo");
/**@type HTMLButtonElement */
const downloadButton = document.getElementById("download-photo");

/**@type HTMLAnchorElement */
const link = document.getElementById("photo-source");

const Frame = new Image();
Frame.src = "images/gallery/Frame.png";

let photoData;

// Functions
async function setCamera() {
    if (window.innerWidth > 576) {
        try {
            let getCam = await navigator.mediaDevices.getUserMedia({
                video: {
                    // Setting the aspect ratio 16/9
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 360, ideal: 720, max: 1440 },
                    facingMode: 'user'
                }
            });
            Camera.srcObject = getCam;
            let settings = getCam.getVideoTracks()[0].getSettings();
            Camera.width = settings.width;
            Camera.height = settings.height;
            Camera.play();
        } catch (error) {
            console.log(error);
            bootstrap.Modal.getInstance(document.querySelector('#photobooth-modal')).hide();
            alertMessage("cameraError", "danger");
        }
    } else {
        bootstrap.Modal.getInstance(document.querySelector('#photobooth-modal')).hide();
        alertMessage("rotateDevice", "danger");
    }
};

function takePhoto() {
    let width = Camera.width;
    let height = Camera.height;
    Canvas.width = width;
    Canvas.height = height;

    takeButton.style.display = "none";
    retakeButton.style.display = "inline-block";
    downloadButton.classList.toggle("disabled");

    Camera.style.display = "none";
    Output.style.display = "block";
    
    setTimeout(() => {}, 100); // So that it doesn't have the weird paused frame
    ctx.translate(Canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(Camera, 0, 0, width, height);
    ctx.drawImage(Frame, 0, 0, width, height);
    photoData = Canvas.toDataURL("image/png");
    Output.src = photoData;
}

function retakePhoto() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    takeButton.style.display = "inline-block";

    retakeButton.style.display = "none";
    downloadButton.classList.toggle("disabled");
    
    Camera.style.display = "block";
    Output.style.display = "none";
}

function downloadPhoto() {
    link.download = `${new Date().toISOString().substring(0, 10)}-Frame-by-Kia_Ora_Cafe`
    link.href = photoData;
    link.click();
};