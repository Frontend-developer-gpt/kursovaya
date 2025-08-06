import axios from "axios";
import { translateToEnglish, translateToRussian } from "./translate";

const API_KEY = "b6cf10d5b1cd4cf68673f0c4a1e7ec57";

export async function searchRecipes(query) {
  try {
    const englishQuery = await translateToEnglish(query);

    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        query: englishQuery,
        number: 10,
        apiKey: API_KEY,
      },
    });

    // ⬇ Переводим названия рецептов
    const translatedResults = await Promise.all(
      response.data.results.map(async (recipe) => {
        const translatedTitle = await translateToRussian(recipe.title);
        return {
          ...recipe,
          title: translatedTitle,
        };
      })
    );

    return translatedResults;

  } catch (err) {
    console.error("Ошибка при получении рецептов:", err);
    return [];
  }
}
