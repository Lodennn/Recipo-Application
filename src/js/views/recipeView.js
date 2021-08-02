import squareImage from "../../assets/square.svg";
import View from "./View";
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _message = "";
  _errorMsg = `Can't load recipe 😢`;

  addHandlerRender(handler) {
    const events = ["load", "hashchange"];
    events.forEach((ev) => window.addEventListener(ev, handler));
  }

  servingsUpdateHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--servings");
      if (!btn) return;
      const servingsNumber = +btn.dataset.serv;
      if (servingsNumber >= 1) handler(servingsNumber);
    });
  }

  addBookmarkHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const bookmarkBtn = e.target.closest(".recipe__intro-controls--bookmark");
      if (!bookmarkBtn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `<!-- Recipe Image -->
      <div class="recipe-image">
        <div class="recipe-image--img">
          <img src="${this._data.image}" alt="" class="img-fluid" />
        </div>
        <!-- <img
          src="${squareImage}"
          alt=""
          class="recipe-image--square"
        /> -->
        <!-- <div class="recipe-image--circle"></div> -->
      </div>
      <!-- Recipe Image -->
      <!-- Recipe Info-->
      <div class="recipe__info">
        <div class="recipe__intro">
          <h2 class="recipe-title heading-2">${this._data.title}</h2>
          <p class="recipe__intro-producer">
            brought to you by
            <span class="recipe__intro-producer--name">${
              this._data.publisher
            }</span>
          </p>
          <!-- Recipe Controls -->
          <div class="recipe__intro-controls">
            <button type="button" class="recipe__intro-controls--bookmark ${
              this._data.bookmarked
                ? "recipe__intro-controls--bookmark-active"
                : ""
            }">
              <i class="fa fa-bookmark recipe__intro-controls--bookmark-main"></i>
              <i class="fa fa-bookmark recipe__intro-controls--bookmark-sub"></i>
            </button>
            <div class="recipe__intro-controls--servings">
              <button type="button" class="btn--servings fa fa-minus" data-serv="${
                this._data.servings - 1
              }"></button>
              <span class='recipe__intro-controls--serving'>
                <div class="recipe__intro-data--item">
                  <i class="fa fa-users"></i> 
                  <span>${this._data.servings}</span>
                </div>
                </span>
                <span class='recipe__intro-controls--servings-label'>Servings</span>
              <button type="button" class="btn--servings fa fa-plus" data-serv="${
                this._data.servings + 1
              }"></button>
            </div>
          </div>
          <!-- Recipe Controls -->
          <!-- Recipe Intro Data -->
          <div class="recipe__intro-data">
            <div class="recipe__intro-data--item">
              <i class="fa fa-clock"></i> <span>${
                this._data.cookingTime
              } MINS</span>
            </div>
            <!-- <div class="recipe__intro-data--item">
              <i class="fa fa-users"></i> <span>${this._data.servings}</span>
            </div> -->
            <div class="recipe__intro-data--item ${
              this._data.key ? "" : "hidden"
            }">
              <i class="fa fa-user-check"></i>
            </div>
          </div>
          <!-- Recipe Intro Data -->
        </div>
        <!-- Recipe Ingredients -->
        <div class="recipe recipe--ingredients">
          <div class="recipe__ing">
            <h3 class="recipe-title recipe-title--ingredients heading-3">
              Recipe Ingredients
            </h3>
            <div class="recipe__ingredients">
              <ul class="recipe__ingredients--list list-unstyled">
                ${this._generateIngredients()}
              </ul>
            </div>
          </div>
        </div>
        <!-- Recipe Ingredients -->
        <!-- Cook it-->
        <div class="cook">
          <h4 class="cook__title">How to cook it ?</h4>
          <p class="cook__text">
            This recipe was carefully designed and tested by The Pioneer
            Woman. Please check out directions at their website.
          </p>
          <a href="${
            this._data.sourceUrl
          }" target="_blank" class="btn btn--primary cook__btn mt-sm">Visit</a>
        </div>
        <!-- Cook it-->
      </div>
      <!-- Recipe Info-->`;
  }
  _generateIngredients() {
    return this._data.ingredients
      .map((ing) => {
        const quantity = new Fraction(ing.quantity);
        return `<li class="recipe__ingredients--item">
          <span>${ing.quantity ? quantity : ""}</span> <span>${
          ing.unit
        }</span> <span>${ing.description}</span>  
        
        </li>`;
      })
      .join("");
  }
}

export default new RecipeView();
