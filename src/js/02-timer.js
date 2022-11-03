import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const bodyEl = document.querySelector('body');
const backEl = document.querySelector('p');
const timerInner = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let pointOfStart = options.defaultDate.getTime();
    const enterData = fp.latestSelectedDateObj.getTime();
    if (enterData < pointOfStart) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};
const fp = flatpickr('input', options);
let timerId = null;

bodyEl.style.textAlign = 'center';
backEl.style.textAlign = 'left';
timerInner.style.display = 'flex';
timerInner.style.justifyContent = 'center';
timerInner.style.gap = '20px';
startBtn.style.marginBottom = '40px';
daysEl.style.fontSize = '72px';
hoursEl.style.fontSize = '72px';
minutesEl.style.fontSize = '72px';
secondsEl.style.fontSize = '72px';

startBtn.disabled = true;
startBtn.addEventListener('click', onCountDown);

function onCounterTimer() {
  const dateNow = new Date();
  const counter = fp.latestSelectedDateObj.getTime() - dateNow.getTime();

  return counter;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs() {
  let counter = onCounterTimer();
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(counter / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((counter % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((counter % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((counter % day) % hour) % minute) / second)
  );

  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;

  if (counter < 1000) {
    clearInterval(timerId);
  }
}

function onCountDown() {
  convertMs();
  timerId = setInterval(convertMs, 1000);
  startBtn.disabled = true;
}
