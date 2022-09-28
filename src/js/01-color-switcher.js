const refs = {
  bodyPage: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};
let startInterval = null;

refs.buttonStart.addEventListener('click', () => {
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
  startInterval = setInterval(() => {
    refs.bodyPage.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
refs.buttonStop.addEventListener('click', () => {
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
  clearInterval(startInterval);
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
