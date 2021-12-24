window.addEventListener('load', () => {
    var swiper = new Swiper(".mySwiper", {
        pagination: {
            // Возможность тыкать на шарики
            clickable: true,
            // Класс элемента в css или html
            el: ".swiper-pagination",
            // Динамические шарики, они двигаются
            dynamicBullets: true,
        },
    });
})
