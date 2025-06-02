const circle = document.querySelectorAll('.step');
const progress = document.getElementById('prg');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
// const circle1 = [...circle].reverse();

let a = 0;
let b = 0;

function update(){
    prev.classList.remove('disable')
    next.classList.remove('disable')
    if (a == 0) {
        prev.classList.add('disable');
    } else if (a == 3) {
        next.classList.add('disable');
    };
    circle.forEach((c, i) => {
        c.classList.toggle('active', a === i || i < a);
    })
    progress.style.width = a * 33.33 + '%'
};

next.addEventListener('click', () => {
    if (a < circle.length - 1) a++;
    update()
    console.log(a)
});

prev.addEventListener('click', () => {
    if (a > 0) a--;
    update()
    console.log(a)
});