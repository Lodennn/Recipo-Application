import View from "./View";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview__recipe-item ${
          this._data.id === id ? "active" : ""
        }">
            <a href="#${this._data.id}" class="preview__recipe-link">
            <figure class="preview__recipe-image">
              <img
                src="${this._data.image}"
                alt="preview__Recipe"
                class="img-fluid preview__recipe-img"
              />
            </figure>
            <h3 class="preview__recipe-name">${this._data.title}</h3>
            <p class="preview__recipe-publisher">${this._data.publisher}</p>
            <div class="preview__generated-recipe ${
              this._data.key ? "" : "hidden"
            }">
              <i class="fa fa-user-check"></i>
            </div>
          </a>
        </li>
      `;
  }
}

export default new PreviewView();
