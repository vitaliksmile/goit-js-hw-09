import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const choseDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

flatpickr(choseDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Дата вибрана в минулому!');
    }

    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      const timer = new Timer('.timer', selectedDates[0]);
      timer.start();
      Notify.success('Відлік почався!');
      startBtn.disabled = true;
    });
  },
});

class Timer {
  #intervalId = null;
  #deadLine = null;
  #refs = {};

  constructor(rootSelector, deadLine) {
    this.#getRefs(rootSelector);
    this.#deadLine = deadLine;
  }

  #getRefs(rootSelector) {
    const timer = document.querySelector(rootSelector);
    this.#refs.fields = {};
    this.#refs.fields.days = timer.querySelector('[data-days]');
    this.#refs.fields.hours = timer.querySelector('[data-hours]');
    this.#refs.fields.minutes = timer.querySelector('[data-minutes]');
    this.#refs.fields.seconds = timer.querySelector('[data-seconds]');
  }

  start() {
    this.#intervalId = setInterval(() => {
      const diff = this.#deadLine.getTime() - Date.now();
      const data = this.#convertMs(diff);

      Object.entries(data).forEach(([name, value]) => {
        const item = this.#refs.fields[name];
        item.textContent = this.#addLeadingZero(value);
      });

      if (diff < 1000) {
        // console.log('time is over');
        Notify.success('Відлік закінчився!');
        clearInterval(this.#intervalId);
      }
    }, 1000);
  }

  #convertMs(ms) {
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

  #addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

///------------Приклад для себе--------//////

// // import flatpickr from 'flatpickr';
// // import 'flatpickr/dist/flatpickr.min.css';

// const { Notify } = require('notiflix');

// // import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const TIMER_DEADLINE = new Date(2022, 11, 09, 00, 00);

// class Timer {
//   #intervalid = null;
//   #deadLine = null;
//   #refs = {};
//   constructor(rootSelector, deadLine) {
//     this.#getRefs(rootSelector);
//     this.#deadLine = deadLine;
//   }
//   #getRefs(rootSelector) {
//     const timer = document.querySelector(rootSelector);
//     this.#refs.fields = {};
//     this.#refs.fields.days = timer.querySelector('[data-days');
//     this.#refs.fields.hours = timer.querySelector('[data-hours');
//     this.#refs.fields.minutes = timer.querySelector('[data-minutes');
//     this.#refs.fields.seconds = timer.querySelector('[data-seconds');
//   }
//   start() {
//     if (this.#deadLine.getTime() <= Date.now()) {
//       Notify.failure('Дата вибрана в минулому!!!');
//       return;
//     }
//     Notify.success('Відлік почався!');
//     this.#intervalid = setInterval(() => {
//       const diff = this.#deadLine.getTime() - Date.now();
//       const data = this.#convertMs(diff);

//       Object.entries(data).forEach(([name, value]) => {
//         this.#refs.fields[name].textContent = this.#addLeadingZero(value);
//       });
//     }, 1000);
//   }
//   #convertMs(diff) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(diff / day);
//     // Remaining hours
//     const hours = Math.floor((diff % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((diff % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((diff % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }
//   #addLeadingZero(value) {
//     return String(value).padStart(2, '0');
//   }
// }
// const timer = new Timer('.timer', TIMER_DEADLINE);
// timer.start();
