import View from "./View";
import PreviewView from "./previewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks .preview__recipe-list");
  _message = "";
  _errorMsg = `No bookmarks yet 😢`;

  loadBookmarksHandler(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarkView();
