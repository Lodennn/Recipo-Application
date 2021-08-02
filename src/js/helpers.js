import { TIMEOUT_SECONDS } from "./config";

const wait = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const sendJSONRequest = async (requestConfig) => {
  try {
    const requestPOSTConfig = {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    };
    const response = await fetch(requestConfig.url, requestPOSTConfig);
    const reqResponse = await Promise.race([response, wait(TIMEOUT_SECONDS)]);
    const data = await reqResponse.json();
    if (!reqResponse.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const recipeObjectGenerator = (data, isBookmarked = false) => {
  return {
    ...(isBookmarked && { bookmarked: isBookmarked }),
    id: data.id,
    image: data.image_url,
    ingredients: data.ingredients,
    publisher: data.publisher,
    servings: data.servings,
    sourceUrl: data.source_url,
    title: data.title,
    cookingTime: data.cooking_time,
    ...(data.key && { key: data.key }),
  };
};

export const recipeIngredientsGenerator = (recipe) => {
  try {
    const newRecipeIngredients = Object.entries(recipe)
      .filter((input) => {
        return input[0].startsWith("ingredient") && input[1] !== "";
      })
      .map((ing) => {
        const ingArray = ing[1].split(",");
        const [quantity, unit, description] = ingArray;
        if (ingArray.length !== 3)
          throw new Error("Error Occuried, Wrong Ingredients Format.. 😖");
        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : "",
          description: description ? description : "",
        };
      });
    return newRecipeIngredients;
  } catch (err) {
    throw err;
  }
};
