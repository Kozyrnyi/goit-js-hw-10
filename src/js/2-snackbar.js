// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);
function createPromise(event) {
    event.preventDefault();
    const delay = form.elements.delay.value;
    const checkedValue = form.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            checkedValue === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
    })
        .then(delay => {
            const options = {
                message: `✅ Fulfilled promise in ${delay}ms`,
                bgColor: '#59A10D',
                pbColor: '#326101',
            };
            showMessage(options);
        })
        .catch(delay => {
            const options = {
                message: `❌ Rejected promise in ${delay}ms`,
                bgColor: '#ff7070',
                pbColor: '#B51B1B',
            };
            showMessage(options);
        });
}

// show iziToast message
function showMessage({ message, bgColor, pbColor }) {
    iziToast.show({
        message: message,
        messageColor: '#fff',
        backgroundColor: bgColor,
        theme: 'dark',
        position: 'topCenter',
        timeout: 3000,
        progressBarColor: pbColor,
        animateInside: false,
        transitionIn: 'fadeIn',
    });
}
