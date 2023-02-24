{
  /* <input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div> */
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};
refs.startBtn.disabled = true;

Notify.init({
  clickToClose: true,
  cssAnimationDuration: 1000,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkDate();
  },
};

const calendar = flatpickr(refs.datetimeInput, options);
let intervalID = null;

function checkDate() {
  const isDateValid = Date.now() < calendar.selectedDates[0];

  if (!isDateValid) {
    Notify.warning('Please choose a date in the future!');
    // alert('Please choose a date in the future');
    console.log('isDateValid: ', isDateValid, '\nError! This date is invalid.');
    return;
  }

  refs.startBtn.disabled = false;
  refs.startBtn.addEventListener('click', onStartBntClick);
}

function onStartBntClick() {
  intervalID = setInterval(handler, 1000);
  console.log('Count started...');

  Notify.info('Reload the page, if you want to set new countdown.');

  refs.startBtn.removeEventListener('click', onStartBntClick);
  refs.startBtn.disabled = true;
}

function handler() {
  const time = calendar.selectedDates[0].getTime() - Date.now();

  if (time <= 0) {
    console.log('Count is over!');
    refs.datetimeInput.value = '';
    clearInterval(intervalID);
    return;
  }
  //   console.log(time);
  showResult(time);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function showResult(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}
