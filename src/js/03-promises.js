const { Notify } = require('notiflix');

const refs = {
  formRef: document.querySelector('.form'),
  btnRef: document.querySelector('button'),
};

refs.formRef.addEventListener('submit', onHanddleSubmit);

function onHanddleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let dalayHandle = Number(delay.value);

  let stepHandle = Number(step.value);

  let amountHandle = Number(amount.value);

  for (let i = 1; i <= amountHandle; i += 1) {
    createPromise(i, dalayHandle)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    dalayHandle += stepHandle;
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
