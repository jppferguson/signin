export default class PasswordToggler {

  constructor(element) {
    this.element = element;
    this.field = document.querySelectorAll(element.dataset.target)[0];
    this.toogleClassName = element.dataset.classOff || 'shown';
    this.ariaHide = element.dataset.ariaHide || 'Hide password';
    this.ariaShow = element.getAttribute('aria-label');
    this.toggle();
  }

  toggle() {
    const self = this;
    if (self.element) {
      self.element.addEventListener('click', (e) => {
        // get the current state
        const shown = self.element.dataset.shown === 'true';
        // reverse it
        self.element.dataset.shown = !shown;
        // swap the state
        self.field.setAttribute('type', shown ? 'text' : 'password');
        // set the aria label
        self.element.setAttribute('aria-label', shown ? this.ariaShow : this.ariaHide);
        // toggle class
        self.element.classList.toggle(self.toogleClassName, shown);
        // prevent default button events
        e.preventDefault();
      }, false);
    }
  }

}
