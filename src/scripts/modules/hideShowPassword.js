export default class PasswordToggler {

  constructor(element) {
    this.element = element;
    this.shown = this.element.getAttribute('data-shown') === 'true';
    this.field = document.querySelectorAll(element.getAttribute('data-target'))[0];
    this.toogleClassName = element.getAttribute('data-class-off') || 'shown';
    this.ariaLabelledby = document.querySelector(this.element.getAttribute('aria-labelledby'));
    this.ariaHide = this.ariaLabelledby.ariaHide || 'Hide password';
    this.ariaShow = this.ariaLabelledby.innerText;
    if (this.element) {
      this.element.addEventListener('click', (e) => {
        // set the state to the reverse
        this.setState(!this.shown);
        // prevent default button events
        e.preventDefault();
      }, false);
    }
  }

  setState(shown, setFocus = true) {
    const self = this;
    if (self.element) {
      if (setFocus) {
        // focus back on the field
        self.field.focus();
      }
      // swap the state
      self.field.setAttribute('type', shown ? 'text' : 'password');
      // set the aria label (delayed slightly)
      self.ariaLabelledby.innerText = !shown ? this.ariaShow : this.ariaHide;
      // toggle class
      self.element.classList.toggle(self.toogleClassName, shown);
      // update the state
      self.shown = shown;
    }
  }

}
