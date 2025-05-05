const cards = document.querySelectorAll('.gallery > div');

cards.forEach(card => {
    card.addEventListener('click', () => {
        removeActiveClasses()
        // cards.forEach(c => {
        //     removeActiveClasses()
        //     c.querySelector('h3').style.display = 'none'
        // })
        card.classList.add('active');
        // if (card.classList.contains("active")) {
        //     card.querySelector('h3').style.display = 'block'
        // }
    })
});
function removeActiveClasses() {
    cards.forEach(card => {
        card.classList.remove('active')
    })
}
// cards.forEach(card => {
//     if (card.classList.contains("active"))
//         {card.querySelector('h3').style.display = 'block'
//     }});
