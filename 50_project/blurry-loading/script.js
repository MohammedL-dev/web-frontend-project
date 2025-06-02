const bg = document.getElementById('bg');
const txt = document.getElementById('txt');

let i = 0;
const x = 50;

function scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function animate() {
    if (i <= x) {
        let blurValue = scale(i, 0, x, 10, 0);
        bg.style.filter = 'blur(' + blurValue + 'px)';
        txt.innerHTML = scale(i, 0, x, 0, 100) + "%";
        txt.style.color = "rgba(255, 255, 255," + scale(i, 0, x, 1, 0) + ")";
        i += 2;
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);