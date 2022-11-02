import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const elements = e.currentTarget.elements;
  const delayNumber = Number(elements.delay.value);
  const stepNumber = Number(elements.step.value);
  const amountNumber = Number(elements.amount.value);
  let delay = 0;
  let position = 0;

  for (let i = 0; i < amountNumber; i += 1) {
    position += 1;
    delay = delayNumber + stepNumber * i;

    createPromise(position, delay)
      .then(resolve => Notiflix.Notify.success(resolve))
      .catch(reject => Notiflix.Notify.failure(reject));
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    });
  });
}
