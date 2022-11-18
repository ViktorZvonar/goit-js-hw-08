import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textEl = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

populateData();

function onFormInput() {
  formData.email = inputEl.value;
  formData.message = textEl.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  console.log(formData);
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  inputEl.value = '';
  textEl.value = '';
}

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function populateData() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    inputEl.value = savedData.email;
    textEl.value = savedData.message;
  }
}
