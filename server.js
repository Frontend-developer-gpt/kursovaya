// server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "b6cf10d5b1cd4cf68673f0c4a1e7ec57";

// Перевод текста (русский -> английский или английский -> русский)
async function translate(text, targetLang) {
  const res = await axios.post("https://libretranslate.de/translate", {
    q: text,
    source: targetLang === "en" ? "ru" : "en",
    target: targetLang,
    format: "text"
  }, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data.translatedText;
}

// Маршрут поиска рецептов
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Нет запроса" });

    // Переводим запрос на английский
    const englishQuery = await translate(query, "en");

    // Ищем рецепты по английскому запросу
    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        query: englishQuery,
        number: 10,
        apiKey: API_KEY
      }
    });

    // Переводим названия рецептов на русский
    const translatedResults = await Promise.all(
      response.data.results.map(async (recipe) => {
        const translatedTitle = await translate(recipe.title, "ru");
        return {
          ...recipe,
          title: translatedTitle
        };
      })
    );

    res.json(translatedResults);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Ошибка на сервере" });
  }
});

app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
