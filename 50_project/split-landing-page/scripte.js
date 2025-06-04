const pages = document.querySelectorAll('.page');

pages.forEach(page => {
    page.addEventListener('mouseover', () => {
        page.classList.add('scale')

    })
    page.addEventListener('mouseout', () => {
        page.classList.remove('scale')
    })
})