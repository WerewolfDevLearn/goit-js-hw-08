import trottle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const { email: emailInput, message: messageInput } = form.elements;

const feedbackFormState = {};
try {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedData) {
    if (savedData.email) {
      emailInput.value = savedData.email;
    }
    if (savedData.message) {
      messageInput.value = savedData.message;
    }
  }
} catch (error) {
  console.log(error);
}

form.addEventListener('input', trottle(storeInput, 500));
form.addEventListener('click', onSubmitForm);

function storeInput(event) {
  if (event.target.nodeName === 'INPUT') {
    feedbackFormState.email = event.target.value;
  }

  if (event.target.nodeName === 'TEXTAREA') {
    feedbackFormState.message = event.target.value;
  }
  try {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(feedbackFormState)
    );
  } catch (error) {
    console.log(error);
  }
}

function onSubmitForm(event) {
  if (event.target.nodeName === 'BUTTON' && event.target.type === 'submit') {
    event.preventDefault();
    try {
      const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
      if (savedData) {
        console.log(
          `email: ${savedData.email}`,
          `message:${savedData.message}`
        );
        localStorage.removeItem('feedback-form-state');
      }
    } catch (error) {
      console.log(error);
    }
    emailInput.value = '';
    messageInput.value = '';
  }
}
