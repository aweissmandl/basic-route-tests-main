// Override submit button to use fetch for submission.
document.querySelector('form').addEventListener('submit', async (event) => {
  // Prevent the default form submission.
  event.preventDefault();

  // Get the form element.
  const form = event.target;

  // Collect the form data.
  const formData = new FormData(event.target);

  // Show error if no username is entered.
  if (formData.get('username') === '') {
    // Find the username input element.
    const input = form.querySelector('input[name="username"]');

    // Show the error.
    showError(input, 'Please enter a username');
  } else {
    // If the username is valid, clear any previous errors.
    clearError(form.querySelector('input[name="username"]'));
  }

  // Show error if no password is entered.
  if (formData.get('password') === '') {
    // Find the password input element.
    const input = form.querySelector('input[name="password"]');

    // Show the error.
    showError(input, 'Please enter a password');
  } else {
    // If the password is valid, clear any previous errors.
    clearError(form.querySelector('input[name="password"]'));
  }

  // If there are no errors, submit the form.
  if (!form.querySelector('.error')) {
    // Use fetch to submit the form.
    const response = await fetch('/login', {
      method: 'POST',
      // Turn the form data into a JSON string for the server.
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Show the response from the server.
    const message = await response.text();

    alert(message);
  }
});

function showError(input, message) {
  // If the input already has an error, don't add another one.
  if (input.classList.contains('error')) {
    return;
  }

  // Add the error class to the input element.
  input.classList.add('error');

  // Add an error message to the input element.
  input.insertAdjacentHTML('afterend', `<p class="error">${message}</p>`);
}

function clearError(input) {
  // Remove the error class from the input element.
  input.classList.remove('error');

  // Remove the error message from the input element.
  const error = input.nextElementSibling;

  if (error && error.classList.contains('error')) {
    error.remove();
  }
}
