const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartChangeColor);
stopBtn.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  onChangeColor();
  timerId = setInterval(onChangeColor, 1000);
  startBtn.disabled = true;
}

function onChangeColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function onStopChangeColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  bodyEl.style.backgroundColor = '';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
