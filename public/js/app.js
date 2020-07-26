const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error_message');
const successMessage = document.querySelector('#data');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    errorMessage.textContent = '';
    successMessage.textContent = 'Loading ...';
    fetch(`/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error)
                errorMessage.textContent = data.error.info;
            else
                successMessage.textContent = data.forecast;
        })
    });
});