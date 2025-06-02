const open = document.getElementById('open');
const close = document.getElementById('close');
const cercle = document.getElementById('main_btn');
const page = document.getElementById('page');
const list = document.querySelectorAll('ul > li');


open.addEventListener("click", () => {
    page.classList.remove('r_rotate');
    cercle.classList.remove('btn_r_rotate');
    page.classList.add('rotate');
    cercle.classList.add('btn_rotate');
    list.forEach(li => {
        li.classList.remove('disappear');
        li.classList.add('appear');
    });
});


close.addEventListener("click", () => {
    page.classList.add('r_rotate');
    cercle.classList.add('btn_r_rotate');
    list.forEach(li => {
        li.classList.add('disappear');
    })
})

