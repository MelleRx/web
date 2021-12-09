window.addEventListener("load", () => {
    document.querySelectorAll('nav ul li a').forEach(navitem => {
        if (document.location.href.search(navitem.href) !== -1) {
            navitem.classList.add("active");
        }
    })
});