const serverLogo = document.getElementById("serverLogo");

window.addEventListener("message", (event) => {
    const data = event.data;

    switch (data.action) {
        case "showLogo":
            serverLogo.classList.add("visible");
            break;

        case "hideLogo":
            serverLogo.classList.remove("visible");
            break;
    }
});
