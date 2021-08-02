import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".recipe-form");
  _backdrop = document.querySelector(".backdrop");
  _modal = document.querySelector(".modal");
  _nav = document.querySelector(".nav");
  _message = "Recipe Uploaded Successfully! 😊✅";
  _errorMsg = `Can't upload recipe, Check recipe data 😢💣`;

  constructor() {
    super();
    this.closeModalHandler();
    this.openModalHandler();
  }

  formSubmitHandler(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const formDataArr = [...new FormData(this)];
      const formDataObject = Object.fromEntries(formDataArr);
      handler(formDataObject);
    });
  }

  // Overlays Functions
  closeModalHandler() {
    this._backdrop.addEventListener("click", (e) => {
      this._toggleOverlays();
    });
  }

  setModalDisabledHandler() {
    this._backdrop.setAttribute("disabled", true);
  }

  openModalHandler() {
    this._nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav__item--add-recipe");
      if (!btn) return;
      this._toggleOverlays();
    });
  }
  _toggleOverlays() {
    this._backdrop.classList.toggle("hidden");
    this._modal.classList.toggle("hidden");
  }
}

export default new AddRecipeView();
