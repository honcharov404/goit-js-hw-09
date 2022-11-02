import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const fp = flatpickr('input', options);
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
let timerId = null;

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

  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    clearInterval(timerId);
  }
}

function onCountDown() {
  timerId = setInterval(convertMs, 1000);
  startBtn.disabled = true;
}
