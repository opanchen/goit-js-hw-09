const refs = {
  page: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalID = null;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  //   console.log('Click on START button ', Date.now());
  intervalID = setInterval(changePageBGC, 1000);
  refs.startBtn.disabled = true;

  refs.stopBtn.addEventListener('click', onStopBtnClick);
}

function onStopBtnClick() {
  //   console.log('Click on STOP button ', Date.now());
  clearInterval(intervalID);
  refs.startBtn.disabled = false;

  refs.stopBtn.removeEventListener('click', onStopBtnClick);
}

function changePageBGC() {
  const colorHex = getRandomHexColor();
  refs.page.style.backgroundColor = `${colorHex}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
