export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this._renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._cleanParentElement();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <p class="centered">${message}</p>
      </div>
    `;
    this._cleanParentElement();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _renderError(errorMsg = this._errorMsg) {
    const markup = `
      <div class="error">
        <p class="centered">${errorMsg}</p>
      </div>
    `;
    this._cleanParentElement();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(markup);

    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl)) {
        curEl.innerHTML = newEl.innerHTML;

        Array.from(newEl.attributes).forEach((attr) => {
          return curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _cleanParentElement() {
    this._parentElement.innerHTML = "";
  }

  _renderSpinner() {
    const spinnerMarkup = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    this._cleanParentElement();
    this._parentElement.insertAdjacentHTML("beforeend", spinnerMarkup);
  }
}
