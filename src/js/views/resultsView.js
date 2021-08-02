import View from "./View";
import PreviewView from "./previewView";
class ResultsView extends View {
  _parentElement = document.querySelector(".sidebar .preview__recipe-list");
  _message = "";
  _errorMsg = `Failed to load recipes 😢`;

  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
