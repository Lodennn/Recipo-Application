import * as model from "./model";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";
import bookmarkView from "./views/bookmarkView";
import paginationView from "./views/paginationView";
import addRecipeView from "./views/addRecipeView";
import formValidation from "./form-validation";
import { MODAL_TIMEOUT } from "./config";
import { recipeAnimation, sidebarAnimation } from "./animations";

//prettier-ignore
const recipeFormValidation = new formValidation(addRecipeView._parentElement, ".form__input");

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView._renderSpinner();

    resultsView.update(model.getSearchResultsSlice());

    await model.loadRecipe(id);

    recipeAnimation(recipeView._parentElement);

    sidebarAnimation(true);

    recipeView.render(model.state.recipe);

    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView._renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView._getQuery();
    if (!query) return;

    resultsView._renderSpinner();

    await model.loadSearchResults(query);

    sidebarAnimation(false);

    resultsView.render(model.getSearchResultsSlice());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView._renderError();
  }
};

const controlPagination = function (page) {
  // Render Search Result On Sidebar
  resultsView.render(model.getSearchResultsSlice(page));
  // Render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (numOfServings) {
  model.servingsUpdater(numOfServings);

  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  const currentRecipe = model.state.recipe;
  if (!model.state.recipe.bookmarked) model.addBookmark(currentRecipe);
  else model.deleteBookmark(currentRecipe);

  recipeView.update(currentRecipe);

  bookmarkView.render(model.state.bookmarks);
};

const loadBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe = async (newRecipe) => {
  try {
    addRecipeView._renderSpinner();

    addRecipeView.setModalDisabledHandler();

    await model.uploadRecipe(newRecipe);

    addRecipeView._renderMessage();

    setTimeout(() => {
      addRecipeView._toggleOverlays();
      history.pushState(null, "", `#${model.state.recipe.id}`);
      window.location.reload();
    }, MODAL_TIMEOUT);

    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmarks);
  } catch (err) {
    addRecipeView._renderError(err.message);

    setTimeout(() => {
      history.pushState(null, "", `#${model.state.recipe.id}`);
      window.location.reload();
    }, MODAL_TIMEOUT);
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addFormSubmitHandler(controlSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  recipeView.servingsUpdateHandler(controlServings);
  recipeView.addBookmarkHandler(controlBookmark);
  bookmarkView.loadBookmarksHandler(loadBookmarks);

  recipeFormValidation._formBlurHandler();
  recipeFormValidation.formSubmitHandler(controlUploadRecipe);
};

init();
