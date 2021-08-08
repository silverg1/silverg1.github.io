const body = document.querySelector('body');

const colors = [
    '/img/bg01.jpg',
    '/img/bg02.jpg',
    '/img/bg03.jpg',
    '/img/bg04.jpg',
    '/img/bg05.jpg',
]

function changeBackground() {
    const randomNum = Math.floor(Math.random() * colors.length);
    body.style.backgroundImage = `url(${colors[randomNum]})`;
}

changeBackground();