'use strict';

const gameArea = document.querySelector('.game_area');

init();
function init() {
  addItem('carrot', 5);
  addItem('bug', 5);
}

function addItem(elemName, count) {
  for (let i = 0; i < count; i++) {
    let item = document.createElement('img');
    item.setAttribute('src', './img/'+ elemName + '.png');
    item.setAttribute('class', elemName);
    item.style.position = 'absolute';
    gameArea.append(item);
    item.addEventListener('load', () => {
      const x = gameArea.offsetWidth - item.offsetWidth;
      const y = gameArea.offsetHeight - item.offsetHeight;
      const randomX = randomNumber(x);
      const randomY = randomNumber(y);
      item.style.top = randomY + 'px';
      item.style.left = randomX + 'px';
    })
  }
}

function randomNumber(max) {
  return Math.floor(Math.random()*max);
}