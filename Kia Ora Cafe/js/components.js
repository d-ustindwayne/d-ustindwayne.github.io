var head = document.head;
function writeMeta(name, content) {
    var meta = document.createElement("meta");
    meta.setAttribute("name", name);
    meta.setAttribute("content", content);
    return meta;
}

function writeScriptLink(type, ...script) {
    var newEl;
    if (type == "link") {
        newEl = document.createElement("link");
    }
    
    if (type == "script") {
        newEl = document.createElement("script");
    }
    
    script.forEach(attr => {
        let attribute = attr.split(", ")
        newEl.setAttribute(attribute[0], attribute[1]);
    });

    return newEl;
}

function loadComponent(element, file, classes = null, id = null) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", file, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4)
                if (this.status == 200) {
                    let elem = document.getElementsByTagName(element)[0];
                    elem.innerHTML += this.responseText;
                    if (classes !== null) { elem.classList.add(...classes.split(" ")); }
                    if (id !== null) { elem.id = id }
                    resolve();
                } else {
                    reject();
                }
        };
        xhttp.send();
    });
}

function initHead() {

    // Link - Favicon
    let favicon = writeScriptLink("link", "rel, shorcut icon", "href, images/favicon.ico", "type, image/x-icon");
    head.appendChild(favicon);

    let BSCSS = writeScriptLink("link", "rel, stylesheet", "crossorigin, anonymous",
        "href, https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
        "integrity, sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    );
    head.appendChild(BSCSS);

    let BSIcons = writeScriptLink("link", "rel, stylesheet", "href, https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css");
    head.appendChild(BSIcons);

    // Viewport
    let vp = writeMeta("viewport", "width=device-width, initial-scale=1.0");
    head.appendChild(vp);

    // Author
    let author = writeMeta("author", "Dustin Dwayne Diaz");
    head.appendChild(author);

    // Description
    let desc = writeMeta("description", "Kia Ora Cafe brings the warm, welcoming spirit of New Zealand to the Philippines. With 11 branches nationwide, we serve delightful coffee, fresh pastries, and delicious menu dishes. Experience our 'caffeine with delight'.");
    head.appendChild(desc);

    // Keywords
    let kw = writeMeta("keywords", "Kia Ora Cafe, New Zealand coffee Philippines, coffee shop, best coffee Manila, barista, Filipino cafe, coffee and pastries, cafe menu, breakfast cafe, caffeine with delight, NZ style coffee, cafe near me");
    head.appendChild(kw);

    let toggleJS = writeScriptLink("script", "src, js/toggle.js");
    head.appendChild(toggleJS);
}

async function initPage() {
    try {
        await loadComponent("nav", "components/navbar.html", "navbar fixed-top navbar-expand-md navbar-dark text-light kia-nav", "navBar");
        console.log("Navbar Loaded.");
        await loadComponent("aside", "components/slide-panel.html", "slide-panel overflow-hidden d-flex flex-row position-fixed", "slidePanel")
        console.log("Aside Loaded.");
        await loadComponent("footer", "components/footer.html", "container-fluid p-5 kia-footer", "footer");
        console.log("Footer Loaded.");
        initHead();
    }
    catch {
        alert("Error occured. Please refresh.");
    }
}

initPage();

// let getMarquee = document.getElementsByClassName('marquee');
// let marqueeContainer = getMarquee[0];
// let clone = marqueeContainer.innerHTML;
// // let firstElement = parentSelector.children[0];
// // let i = 0;
// // console.log(firstElement);
// // parentSelector.insertAdjacentHTML('beforeend', clone);
// // parentSelector.insertAdjacentHTML('beforeend', clone);

// // setInterval(function () {
// //     firstElement.style.marginLeft = `-${i}px`;
// //     if (i > firstElement.clientWidth) {
// //       i = 0;
// //     }
// //     i = i + 0.3;
// // }, 0);