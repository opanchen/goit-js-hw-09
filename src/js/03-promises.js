{
  /* <form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form> */
}

{
  //todo Example how to create array from number(const amount):
  // const array = Array.from({ length: amount }, (_, i) => i + 1);
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  timeout: 4000,
  cssAnimationDuration: 1000,
});

const refs = {
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

refs.submitBtn.addEventListener('click', onSubmitBtnClick);

function onSubmitBtnClick(e) {
  e.preventDefault();
  generatePromises();
  clearFormFields();
}

function generatePromises() {
  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  const amount = Number(refs.amountInput.value);

  for (let i = 1; i <= amount; i += 1) {
    const position = i;

    createPromise(position, delay)
      .then(({ position, delay }) =>
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`)
        Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function clearFormFields() {
  setTimeout(() => {
    refs.delayInput.value = '';
    refs.stepInput.value = '';
    refs.amountInput.value = '';
  }, 1000);
}
