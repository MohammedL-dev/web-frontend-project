const sound_box = document.querySelectorAll('.sound-box');

const applause = new Audio('sound/applause.mp3');
const boo = new Audio('sound/boo.mp3');
const gasp = new Audio('sound/gasp.mp3');
const wrong = new Audio('sound/wrong.mp3');

const audio = [applause, boo, gasp, wrong];

let isPlayed = false;

sound_box.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (isPlayed) {
            audio.forEach(sound => {
                sound.pause();
            });
        }
        audio[index].play();
        isPlayed = true;
    });
});