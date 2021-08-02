class formValidation {
  _formIsValid = [];
  constructor(parentEl, inputs) {
    this._parentEl = parentEl;
    this.inputs = Array.from(this._parentEl.querySelectorAll(inputs)).filter(
      (inp) => inp.hasAttribute("required")
    );
    this._formBlurHandler();
  }

  _formBlurHandler() {
    this.inputs.forEach((inp) => {
      inp.addEventListener("blur", (e) => {
        const targetInput = e.target;
        if (targetInput.value === "") {
          targetInput.classList.add("invalid");
          targetInput.classList.remove("valid");
        } else {
          targetInput.classList.add("valid");
          targetInput.classList.remove("invalid");
        }
        const formStatus = this._formValidityStatus();
      });
    });
  }
  formSubmitHandler(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const formStatus = this._formValidityStatus().every(
        (inpStatus) => inpStatus
      );
      if (!formStatus) return;
      const formDataArr = [...new FormData(e.target)];
      const formDataObject = Object.fromEntries(formDataArr);
      handler(formDataObject);
    });
  }
  _formValidityStatus() {
    this._formIsValid = [];
    this.inputs.forEach((inp) => {
      if (
        inp.classList.contains("invalid") ||
        (!inp.classList.contains("invalid") && !inp.classList.contains("valid"))
      ) {
        this._formIsValid.push(false);
      } else if (inp.classList.contains("valid")) {
        this._formIsValid.push(true);
      }
    });
    return this._formIsValid;
  }
}

export default formValidation;
