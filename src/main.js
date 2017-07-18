import Game from './Game';


window.addEventListener('load', init);

function init() {
    let canvas = document.getElementById('canvas');
    let game = new Game(canvas);
    game.start();
}