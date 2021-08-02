import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _errorMsg = "";

  addPaginationHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination--btn");
      if (!btn) return;
      const targetPage = +btn.dataset.page;
      handler(targetPage);
    });
  }

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.itemsPerPage
    );
    const currentPage = this._data.page;
    // if first page
    if (currentPage === 1 && numOfPages > 1) {
      return `
      <span class="pagination--page">Page ${currentPage}</span>
      <span class="pagination--btn pagination--right" data-page=${
        currentPage + 1
      }>
        Next Page <span>&rarr;</span>
      </span>`;
    }

    // if middle page
    if (currentPage < numOfPages) {
      return `
      <span class="pagination--btn pagination--left" data-page=${
        currentPage - 1
      }>
        <span>&larr;</span> Previous Page
      </span>
      <span class="pagination--page">Page ${currentPage}</span>
      <span class="pagination--btn pagination--right" data-page=${
        currentPage + 1
      }>
        Next Page <span>&rarr;</span>
      </span>`;
    }
    // if last page
    if (currentPage === numOfPages && numOfPages > 1) {
      return `
      <span class="pagination--btn pagination--left" data-page=${
        currentPage - 1
      }>
        <span>&larr;</span> Previous Page
      </span>
      <span class="pagination--page">Page ${currentPage}</span>`;
    }
    // if only first page
    return "";
  }
}

export default new PaginationView();
