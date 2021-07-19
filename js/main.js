'use strict';

const gameResult = document.querySelector('.game_result');
const resultText = document.querySelector('.result');
const gameTimer = document.querySelector('.game_timer');
const gameAmount = document.querySelector('.game_count');
const gameArea = document.querySelector('.game_area');
const btnPlay = document.querySelector('.game_control');
const btnReplay = document.querySelector('.replay');
let timer;
let timerLeft;
let randomAmount = 0;



btnPlay.addEventListener('click', () => {
  if (!btnPlay.classList.contains('on')) {
    gameStart();
  } else {
    gameOver();
  }
})
btnReplay.addEventListener('click', gameStart)

function gameStart() {
  btnPlay.classList.add('on');
  gameResult.classList.remove('on');
  gameArea.innerHTML = '';
  randomAmount = randomNumber(10) + 1;
  gameAmount.textContent = randomAmount;
  init(randomAmount);
  startTimer();
  gameArea.addEventListener('click', gamePlay);
}
function gameOver() {
  btnPlay.classList.remove('on');
  gameResult.classList.add('on');
  gameArea.removeEventListener('click', gamePlay);
  clearInterval(timer);
  if (randomAmount === 0) {
    resultText.textContent = 'You Win🎉';
  } else {
    resultText.textContent = 'You Loose👎';
  }
}
function gamePlay(ev) {
  if (ev.target.tagName !== 'IMG') return;
  if (ev.target.className === 'bug') {
    gameOver();
  } else {
    ev.target.remove();
    randomAmount--;
    gameAmount.textContent = randomAmount;
  }
  if (randomAmount === 0) gameOver();
}
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  gameArea.appendChild(this.sound);
  this.play = () => this.sound.play()
  this.stop = () => this.sound.pause();
}
function updateTimer() {
  if (timerLeft >= 0) {
    gameTimer.textContent = `0:${timerLeft}`;
  }
  if (timerLeft === 0) {
    gameOver();
  }
  timerLeft -= 1;
}
function startTimer() {
  timerLeft = 5;
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}
function init(num) {
  addItem('carrot', num);
  addItem('bug', num);
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