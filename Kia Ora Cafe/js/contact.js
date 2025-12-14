const messageLength = document.getElementById("message-textarea");
const messageInput = document.getElementById("message-message");
messageLength.textContent = `${messageInput.value.length}/250`;
messageInput.addEventListener('input', () => {
    messageLength.textContent = `${messageInput.value.length}/250`;
})

const feedbackLength = document.getElementById("feedback-textarea");
const feedbackInput = document.getElementById("feedback-feedback");
feedbackLength.textContent = `${feedbackInput.value.length}/250`;
feedbackInput.addEventListener('input', () => {
    feedbackLength.textContent = `${feedbackInput.value.length}/250`;
})
/** @type HTMLFormElement */
let messageForm = document.querySelector(".message-form.needs-validation");
/** @type HTMLFormElement */
let feedbackForm = document.querySelector(".feedback-form.needs-validation");

/** @type HTMLCollectionOf<HTMLInputElement>*/
const ratingInput = document.getElementsByClassName("feedback-star-input");
let selectedStar;
const starText = document.getElementById("star-count");
for (let i = 0; i < ratingInput.length; i++) {
    let checkStar = () => {
        if (ratingInput[i].checked) {
            selectedStar = Number(ratingInput[i].value);
            starText.classList.replace("d-none", "d-block");
        }
        if (selectedStar == 1) {starText.textContent = `(${selectedStar} Star)`;}
        else {starText.textContent = `(${selectedStar} Stars)`;}
    }
    checkStar();
    ratingInput[i].addEventListener("change", checkStar);
}

/**@type HTMLInputElement */
const photoInput = document.getElementById("feedback-photo");
const filesText = document.getElementById("file-upload");
const validIcon = document.getElementById("rating-valid-icon");
const invalidIcon = document.getElementById("rating-invalid-icon");

printPhotoFiles();
photoInput.addEventListener("change", printPhotoFiles);


messageForm.addEventListener('submit', (e) => {
    if (!messageForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    messageForm.classList.add("was-validated");
});

messageForm.onsubmit = (e) => {
    if (messageForm.checkValidity()) {
        e.preventDefault();
        localStorage.setItem("currentSubmitted", "Message")
        resetForms()
        window.location.reload();
        return false;
    };
}

feedbackForm.addEventListener('submit', (e) => {
    
    if (!feedbackForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (selectedStar && photoInput.files.length > 0) {
        validIcon.classList.replace("d-none", "d-block");
        invalidIcon.classList.replace("d-block", "d-none");
    } else {
        validIcon.classList.replace("d-block", "d-none");
        invalidIcon.classList.replace("d-none", "d-block");
    }
    feedbackForm.classList.add("was-validated");
});

feedbackForm.onsubmit = (e) => {
    if (feedbackForm.checkValidity()) {
        e.preventDefault();
        localStorage.setItem("currentSubmitted", "Feedback")
        resetForms()
        window.location.reload();
        return false;
    }
};

function printPhotoFiles() {
    let pLen = photoInput.files.length;
    if (pLen > 10) {
        filesText.textContent = "Upload maximum of 10 photos."
        photoInput.value = '';
    }
    for (let f = 0; f < pLen; f++) {
        if (f == 0) {filesText.textContent = `${photoInput.files[f].name}`;}
        else filesText.textContent += `, ${photoInput.files[f].name}`
    }
    if (pLen > 0) filesText.classList.replace("d-none", "d-block");
    else filesText.classList.replace("d-block", "d-none");
}

/* function checkInput() {
    for (let s = 1; s <= 5; s++) {
        let currStar = document.getElementById(`star${s}`);
        if (currStar.checked) {
            for (let x = s; x > 0; x--) {
                let currStarLabel = document.getElementById(`label-star${x}`);
                currStarLabel.children[0].classList.replace("bi-star", "bi-star-fill");
            }
        } else {
            let currStarLabel = document.getElementById(`label-star${s}`);
            currStarLabel.children[0].classList.replace("bi-star-fill", "bi-star");
        }
    }
}

let starsInput = document.querySelectorAll(".feedback-star-input");
starsInput.forEach(star => {
    star.addEventListener('change', checkInput(this.value));
}); */