import "regenerator-runtime";
import { API_KEY, API_URL } from "./config";
import {
  recipeObjectGenerator,
  sendJSONRequest,
  recipeIngredientsGenerator,
} from "./helpers";

export const state = {
  recipe: {},
  search: {
    results: [],
    itemsPerPage: 10,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (hashId) {
  try {
    const data = await sendJSONRequest({
      url: `${API_URL}/${hashId}?key=${API_KEY}`,
    });
    const { recipe } = data.data;
    const isBookmarked = state.bookmarks.some((bm) => bm.id === recipe.id);

    const formattedRecipeObject = recipeObjectGenerator(recipe, isBookmarked);
    state.recipe = { ...formattedRecipeObject };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const response = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`);
    const data = await response.json();

    const { recipes } = data.data;

    const formattedRecipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.results = formattedRecipes;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsSlice = function (page = state.search.page) {
  state.search.page = page;
  const next = page * state.search.itemsPerPage;
  const prev = next - state.search.itemsPerPage;
  return state.search.results.slice(prev, next);
};

export const servingsUpdater = function (numOfServings) {
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity * numOfServings) / state.recipe.servings)
  );
  state.recipe.servings = numOfServings;
};

const setBookmark = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  setBookmark();
};

export const deleteBookmark = function (recipe) {
  // state.bookmarks = state.bookmarks.filter((bm) => bm.id !== recipe.id);
  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === recipe.id
  );
  state.bookmarks.splice(index, 1);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  setBookmark();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const newRecipeIngredients = recipeIngredientsGenerator(newRecipe);

    const transformedRecipeObject = {
      image_url: newRecipe.image_url,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      ingredients: newRecipeIngredients,
      cooking_time: +newRecipe.cooking_time,
      title: newRecipe.title,
      source_url: newRecipe.source_url,
    };

    const {
      data: { recipe },
    } = await sendJSONRequest({
      url: `${API_URL}?key=${API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: transformedRecipeObject,
    });
    const data = recipeObjectGenerator(recipe);
    state.recipe = data;

    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = () => {
  const storageBookmarks = localStorage.getItem("bookmarks");
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);
};
init();
