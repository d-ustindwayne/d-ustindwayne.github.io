// Check if the browser is offline
window.addEventListener("offline", () => {
    let artc = document.getElementsByTagName("article")[0];
    if (artc.innerHTML) return;
    loadComponent("article", "components/alert-offline.html", "container-fluid rounded-0 bgcolor-danger fixed-top");
});

// Check the input for the newsletter in the footer
/**@type HTMLInputElement */
let newsletterForm = document.querySelector(".footer-newsletter.needs-validation");
newsletterForm.onsubmit = (e) => {
    if (newsletterForm.checkValidity()) {
        e.preventDefault();
        localStorage.setItem("currentSubmitted", "Newsletter")
        resetForms()
        window.location.reload();
        return false;
    };
}
newsletterForm.addEventListener('input', (e) => {
    if (!newsletterForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    newsletterForm.classList.add("was-validated");
});
newsletterForm.addEventListener('submit', (e) => {
    if (!newsletterForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    newsletterForm.classList.add("was-validated");
});

// Check the input for the contact
// let contactForm = document.querySelector("")

// Check the input for the feedback modal


// video courses javascript
let videos = document.getElementsByClassName("course-video");
Array.from(videos).forEach(video => {
    video.addEventListener('mouseenter', () => {video.play();});
    video.addEventListener('mouseleave', () => {video.pause(); video.currentTime = 0;});
});

// let cardOne = document.querySelector(".feedback-container");
// window.getComputedStyle(cardOne);

// localStorage.setItem("marquee", );
// localStorage.getItem();

// window.onload


//.forEach(element => {
    
//});

/* I planned on creating a function where i would just load each user feedback in the marquee but I found
 it too complex and just decided to manually do it, that is also why there is a user_feedback.json file in this folder.*/

/* let card = `
<div class="card feedback-container">
    <div class="row g-0">
        <div class="col-3">
            <img src="images/feedbacks/user_${count}.png" alt="..." class="feedback-customer img-fluid">
        </div>
        <div class="col-9">
            <div class="card-body">
                <blockquote class="blockquote heading-semibold">
                    <i class="bi bi-quote"></i>
                    ${feedback}
                </blockquote>
                <p class="blockquote-footer heading-regular mb-1">${customer}</p>
                <p class="location heading-regular mb-1">Kia Ora Cafe | ${branch}</p>
                <div class="stars d-flex align-items-center">
                    ${stars}
                    <p class="ms-2 mb-0 textcolor-muted">(${star_count} stars)</p>
                </div>
            </div>
        </div>
    </div>
</div>
`; */