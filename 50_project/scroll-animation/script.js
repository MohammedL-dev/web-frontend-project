const cards = document.querySelectorAll('.card');

let position = 400;

window.addEventListener('scroll', function() {
    cards.forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.style.transform = "translateX(0)";
        } else {
            card.style.transform = "translateX(" + position + "%)";
            position *= -1;
        }
    });
});

