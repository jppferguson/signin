import 'babel-polyfill';
import './polyfills';
import HideShowPassword from './modules/hideShowPassword';
import validate from './modules/validate';

// Add/remove js classes
document.documentElement.classList.add('js');
document.documentElement.classList.remove('no-js');

// Initialise show/hide password button
const toggleShowHidePassword = new HideShowPassword(document.querySelector('#togglePassword'));
toggleShowHidePassword.setState(false, false);

function toggleClasslist(el, className, toggle) {
  if (toggle) {
    el.classList.add(className, toggle);
  } else {
    el.classList.remove(className, toggle);
  }
}

// Floating label pattern
function toggleFloatingLabel(e) {
  toggleClasslist(this.closest('.floating-label'), 'floating-label-show', e.target.value.length > 0);
}
Array.from(document.querySelectorAll('.floating-label .form-control')).forEach((element) => {
  element.addEventListener('keyup', toggleFloatingLabel, false);
  element.addEventListener('keydown', toggleFloatingLabel, false);
});

// Show trouble signing in element on click
document.querySelectorAll('.js-show-element')[0].addEventListener('click', (e) => {
  document.querySelector(e.target.hash).classList.add('shown');
}, false);


// Validate sign-in form
let allowSubmit = false;
const $signInForm = document.querySelectorAll('form')[0];
const $errorMessage = document.getElementById('errorMessage');

// Listen for submit event
if ($signInForm) {
  $signInForm.addEventListener('submit', (e) => {
    if (!allowSubmit) {
      e.preventDefault();
    }
    const $inputFields = $signInForm.querySelectorAll('input');
    const $loadingSpinner = document.querySelector('#loadingSpinner');
    const $submitButton = $signInForm.querySelector('[type="submit"]');

    // add hidden class to the error message
    $errorMessage.classList.add('hidden');

    // loop through each element
    const validations = Array.from($inputFields).map((element) => {
      const types = ['email', 'password'];
      if (types.indexOf(element.getAttribute('data-validation-type')) > -1) {
        return {
          $element: element,
          minLength: element.getAttribute('data-minlength'),
          value: element.value,
          validationType: element.getAttribute('data-validation-type'),
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

    // check if form is valid
    if (!isValid) {
      e.preventDefault();
      $errorMessage.focus();
    } else if (!allowSubmit) {
      // fake the loading:
      // show and focus loading spinner
      $loadingSpinner.classList.remove('hidden');
      $loadingSpinner.focus();
      $submitButton.setAttribute('disabled', true);
      setTimeout(() => {
        allowSubmit = true;
        $signInForm.submit();
      }, 2000);
    }
  });
}
