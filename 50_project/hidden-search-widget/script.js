const btn = document.getElementById('search');
const input = document.getElementById('input');

btn.addEventListener('click', () => {
    input.classList.toggle('close');
    input.classList.toggle('active');
})