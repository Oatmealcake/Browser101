'use strict';

const gameResult = document.querySelector('.game_result');
const resultText = document.querySelector('.result');
const gameTimer = document.querySelector('.game_timer');
const gameAmount = document.querySelector('.game_count');
const gameArea = document.querySelector('.game_area');
const btnPlay = document.querySelector('.game_control');
const btnReplay = document.querySelector('.replay');
let started = false;
let timer = undefined;
let timerLeft = 5;
let randomAmount = 0;

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');


btnPlay.addEventListener('click', () => {
  if (!started) {
    gameStart();
  } else {
    gameOver();
  }
})
btnReplay.addEventListener('click', gameStart);

function gameStart() {
  started = true;
  btnPlay.classList.add('on');
  gameResult.classList.remove('on');
  randomAmount = randomNumber(10) + 1;
  gameAmount.textContent = randomAmount;
  init(randomAmount);
  startTimer();
  palySound(bgSound);
  gameArea.addEventListener('click', gamePlay);
}
function gameOver() {
  started = false;
  stopSound(bgSound);
  btnPlay.classList.remove('on');
  gameResult.classList.add('on');
  gameArea.removeEventListener('click', gamePlay);
  clearInterval(timer);
  if (randomAmount === 0) {
    resultText.textContent = 'You Won🎉';
    palySound(winSound);
  } else {
    resultText.textContent = 'You Lost👎';
    palySound(bugSound);
  }
}
function gamePlay(ev) {
  if (ev.target.tagName !== 'IMG') return;
  if (ev.target.className === 'bug') {
    gameOver();
  } else {
    palySound(carrotSound);
    ev.target.remove();
    randomAmount--;
    gameAmount.textContent = randomAmount;
  }
  if (randomAmount === 0) gameOver();
}
function palySound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
function updateTimer(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  if (sec >= 0) {
    gameTimer.textContent = `${minutes}:${seconds}`;
  }
  if (sec <= 0) {
    gameOver();
  }
}
function startTimer() {
  let timerSec = timerLeft;
  updateTimer(timerSec);
  timer = setInterval(() => {
    updateTimer(--timerSec);
  }, 1000);
}
function init(num) {
  gameArea.innerHTML = '';
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