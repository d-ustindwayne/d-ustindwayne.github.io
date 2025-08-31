const agendas = JSON.parse(localStorage.getItem("agendas")) || [];

contacts = [
    {
        text: "Facebook",
        link: "https://www.facebook.com/buday.py/",
        color: "#5c87ff"
    }
    ,
    {
        text: "Email",
        link: "mailto:nepomucenodwayne@gmail.com?subject=Hello%20Dustin&body=Hi%20Dustin!%20I%20am%20available%20at%20(time)%20(day)%0DThings%20we%20will%20be%20doing%3A%0D-%20".concat(encodeURIComponent(agendas.join("\n- "))),
        color: "#777777"
    },
    {
        text: "Instagram",
        link: "https://www.instagram.com/mapang.he/",
        color: "#eb4faf"
    }
]

window.onload = () => {
    buttonLink = document.getElementById("btn-link");
    buttonLink.href = contacts[1].link
    buttonText = document.getElementById("btn-text");
    index = 0
}

function updateContact() {
    buttonText.classList.add("fade-out");
    setTimeout(() => {
        buttonLink.href = contacts[index].link;
        buttonText.textContent = contacts[index].text;
        buttonText.style.backgroundColor = contacts[index].color;
        
        buttonText.classList.remove("fade-out");
        buttonText.classList.add("fade-in");
        
        index = (index + 1) % contacts.length;
    }, 500);
}

setInterval(updateContact, 3500);