class SearchView {
  _parentElement = document.querySelector(".search");
  _searchInput = this._parentElement.querySelector(".search__input");
  addFormSubmitHandler(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _getQuery() {
    const query = this._searchInput.value;
    this._clearSearchInput();
    return query;
  }

  _clearSearchInput() {
    this._searchInput.value = "";
  }
}

export default new SearchView();
