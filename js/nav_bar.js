window.addEventListener("load", () => {
    let reference = document.location.href.split('/');

    switch(reference[reference.length - 1]){
        case '':
        case 'index.html':
            document.querySelectorAll('nav ul li a')[0].classList.add('active');
            break;
        case 'projects.html':
            document.querySelectorAll('nav ul li a')[2].classList.add('active');
            break;
    }
});