
import axios from "axios";

const API_KEY = "678a6f5403274b50943248adef85c583";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const RECIPE_URL = "https://api.spoonacular.com/recipes";

export async function searchRecipes(query) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        query,
        number: 12,
        apiKey: API_KEY,
      },
    });
    return res.data.results;
  } catch (err) {
    console.error("Ошибка при получении рецептов:", err);
    return [];
  }
}

export async function getRecipeById(id) {
  try {
    const res = await axios.get(`${RECIPE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });
    return res.data;
  } catch (err) {
    console.error("Ошибка при получении рецепта:", err);
    return null;
  }
}
