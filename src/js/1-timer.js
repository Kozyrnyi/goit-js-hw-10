// flatpickr library
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// error icon for iziToast message
import errorIcon from '../img/error_icon.svg';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

// create flatpickr
let userSelectedDate;
flatpickr(datePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        handlerCalendarClose();
    },
});

function handlerCalendarClose() {
    if (userSelectedDate > Date.now()) {
        startBtn.removeAttribute('disabled');
        return;
    }
    // show iziToast error message
    iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#EF4040',
        theme: 'dark',
        iconUrl: errorIcon,
        position: 'topCenter',
        timeout: 3000,
        progressBarColor: '#B51B1B',
        animateInside: false,
        transitionIn: 'fadeIn',
    });

    startBtn.setAttribute('disabled', '');
}

const valueFields = document.querySelectorAll('.timer .value');

// add click event to start button
startBtn.addEventListener('click', handlerBtnClick);

let intervalId;
function handlerBtnClick() {
    datePicker.setAttribute('disabled', '');
    startBtn.setAttribute('disabled', '');

    intervalId = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();
}

// update remaining time
function updateRemainingTime() {
    const totalTime = userSelectedDate - Date.now();
    const timeValues = Object.values(convertMs(totalTime));

    if (totalTime < 0) {
        clearInterval(intervalId);
        datePicker.removeAttribute('disabled');
        return;
    }

    valueFields.forEach((field, index) => (field.textContent = addLeadingZero(timeValues[index])));
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
    return value.toString().padStart(2, '0');
}
