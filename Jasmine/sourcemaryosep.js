yesbutton = document.getElementById("yes");
nobutton = document.getElementById("no");
defsize = 2.5;
yesfont = 20;
nosize = 2.5;
noopacity = 100;
agd = document.querySelector(".container2");

function enlarge() {
    defsize += 2.25;
    nosize -= 0.25;
    noopacity -= 15
    yesfont += 3.3
    if (nosize < 1.75) {
        noopacity = 100
        nobutton.style.opacity = `${noopacity}%`
        nobutton.textContent = "Yes";
        nobutton.style.backgroundColor = "lightgreen"
        nobutton.style.boxShadow = "none"
        nobutton.addEventListener("click", () => {window.location.href = "yes.html";});
    }
    yesbutton.style.height = `${defsize}em`;
    yesbutton.style.fontSize = `${yesfont}px`
    nobutton.style.height = `${nosize}em`
    nobutton.style.opacity = `${noopacity}%`
}
function openAgenda() {
    yesbutton.disabled = true;
    yesbutton.style.cursor = "default";
    nobutton.disabled = true;
    nobutton.style.cursor = "default";
    agd.style.display = "grid";
    setTimeout(() => {
        agd.classList.remove("fade-out");
        agd.classList.add("fade-in");
    }, 500)
}
yesbutton.addEventListener("click", openAgenda)

proceedButton = document.getElementById("proceed");
proceedButton.addEventListener("click", () => {
    agendas = []
    for (let i = 1; i <= 10; i++) {
        let checkbox = document.getElementById(`agenda${i}`);
        if (checkbox && checkbox.checked) {
            agendas.push(checkbox.value);
        }
    };
    if (agendas.length === 0) {
        alert("Select at least one. pleaseeee :((");
        return;
    }
    localStorage.setItem("agendas", JSON.stringify(agendas));
    window.location.href = "yes.html";
})