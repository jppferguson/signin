import HideShowPassword from './modules/hideShowPassword';
import validate from './modules/validate';

// Add/remove js classes
document.documentElement.classList.add('js');
document.documentElement.classList.remove('no-js');

// Initialise show/hide password button
const toggleShowHidePassword = new HideShowPassword(document.querySelector('#togglePassword'));

// Show trouble signing in element on click
document.querySelectorAll('.js-show-element')[0].addEventListener('click', (e) => {
  document.querySelector(e.target.hash).classList.add('shown');
}, false);


// Validate sign-in form
const $signInForm = document.querySelectorAll('form')[0];
const $errorMessage = document.getElementById('errorMessage');

// Listen for submit event
if ($signInForm) {
  $signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $inputFields = $signInForm.querySelectorAll('input');
    // add hidden class to the error message
    $errorMessage.classList.add('hidden');

    // loop through each element
    const validations = Array.from($inputFields).map((element) => {
      const types = ['email', 'password'];
      if (types.indexOf(element.dataset.validationType) > -1) {
        return {
          $element: element,
          minLength: element.dataset.minlength,
          value: element.value,
          validationType: element.dataset.validationType,
        };
      }
      return false;
    }).filter(Boolean);
    // check form is valid by validating each element
    const isValid = validate.multiple(validations);

    // toggle element error classes
    $errorMessage.classList.toggle('hidden', isValid);
    validations.forEach((element) => {
      const $el = element.$element;
      $el.setAttribute('aria-invalid', !isValid);
      $el.classList.toggle('form-control-danger', !isValid);
      $el.parentNode.classList.toggle('has-danger', !isValid);
    });
    if (!isValid) {
      e.preventDefault();
      $errorMessage.focus();
    }
  });
}
