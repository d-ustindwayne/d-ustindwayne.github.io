if (true) loadNotif();
var body = document.body;

// Side Panel
let panelButton = document.getElementById("panelButton");
let slidePanel = document.getElementById("slidePanel");
let iconTag = document.getElementById("panelButtonIcon");

let panelState = localStorage.getItem("hidePanel");
let hidePanel = panelState === "true";
let spLeftValue = slidePanel.style.left;
let iconClass = ["bi-chevron-double-left", "bi-chevron-double-right"];

function initPanel() {
    if (!hidePanel) {
        slidePanel.classList.add("show");
        iconTag.className = `bi ${iconClass[0]}`;
        slidePanel.style.left = "0%";
    } else {
        slidePanel.classList.remove("show");
        iconTag.className = `bi ${iconClass[1]}`;
        slidePanel.style.left = spLeftValue;
    }
}

function togglePanelButton() {
    hidePanel = !hidePanel;
    initPanel();
    localStorage.setItem("hidePanel", hidePanel);
}

initPanel();
panelButton.addEventListener("click", togglePanelButton);

// Dark Mode
let classDark = "dark-mode";
let slideDM = document.getElementById(`${classDark}-slide`);
let phoneDM = document.getElementById(`${classDark}-phone`);
let darkModeButtons = [slideDM, phoneDM];

let navbarBrand = document.getElementById("brand-icon");
let footerBrand = document.getElementById("footer-brand");
let thumbnails = document.getElementsByClassName("video-thumbnail");
let headerIcon = document.getElementById("header-icon");

let darkModeState = localStorage.getItem("darkmode");
let isDark = darkModeState === "true";

function setDarkMode(state) {
    if (state) {body.classList.add(classDark);}
    else {body.classList.remove(classDark);}

    darkModeButtons.forEach(button => button.checked = state);
    let currentMode = state? "dark" : "light";
    
    navbarBrand.src = `images/kia-ora-cafe-icons/${currentMode}/logotype.png`;
    footerBrand.src = `images/kia-ora-cafe-icons/${currentMode}/logobadge.png`;
    let docloc = document.location.href;
    if (docloc.includes("menu-") || docloc.includes("branches") 
        || docloc.includes("courses") || docloc.includes("about"))
        {headerIcon.src = `images/kia-ora-cafe-icons/${currentMode}/logotype.png`;}
    if (docloc.includes("account")) {
        document.querySelectorAll(".account-icon").forEach(imageTag => {
            imageTag.src = `images/kia-ora-cafe-icons/${currentMode}/logotype.png`;
        });
    }

    // thumbnails.forEach(tn => {
    //     tn.src = `images/kia-ora-cafe-icons/${currentMode}/fascia-sign.png`;
    // }); doesn't work so well go back to the primitive way hahahaha
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].src = `images/kia-ora-cafe-icons/${currentMode}/fascia-sign.png`;
    }
}

function toggleDarkMode() {
    isDark = !isDark;
    setDarkMode(isDark);
    localStorage.setItem("darkmode", isDark);
}

setDarkMode(isDark);
darkModeButtons.forEach(button => {
    if(button) {
        button.addEventListener("click", toggleDarkMode);
    }
});

let BSjs = writeScriptLink("script", "crossorigin, anonymous",
    "src, https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    "integrity, sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz");
body.appendChild(BSjs);

let rsJS = writeScriptLink("script", "src, js/responsive.js");
body.appendChild(rsJS);

function goCourseCarousel() {
    document.getElementById("kia-courses-carousel-sm").scrollIntoView({top: 100});
}

function resetForms() {
    let forms = document.forms;
    for (let q = 0; q < forms.length; q++) forms[q].reset();
}

function alertMessage(message, color) {
    let artc = document.getElementsByTagName("article")[0];
    if (artc.innerHTML) return;
    loadComponent("article", `components/alert-${message}.html`, `container-fluid rounded-0 bgcolor-${color} fixed-top fade show`)
    setTimeout(() => artc.innerHTML = "", 10000);
}

function loadNotif() {
    let loadMessage = localStorage.getItem("currentSubmitted");
    if (loadMessage) {alertMessage(`submit${loadMessage}`, 'success');}
    localStorage.setItem("currentSubmitted", "");
}