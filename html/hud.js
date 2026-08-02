const serverLogo = document.getElementById("serverLogo");

window.addEventListener("message", (event) => {
    const data = event.data;

    switch (data.action) {
        case "showLogo":
            serverLogo.style.display = "block";
            break;

        case "hideLogo":
            serverLogo.style.display = "none";
            break;
    }
});