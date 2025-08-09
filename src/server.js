import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { q, source, target } = req.body;

    if (!q || !source || !target) {
      return res.status(400).json({ error: "Отсутствуют необходимые поля" });
    }

    const response = await axios.post(
      "https://libretranslate.de/translate",
      {
        q,
        source,
        target,
        format: "text"
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    res.json({ translatedText: response.data.translatedText });
  } catch (err) {
    console.error("Ошибка перевода:", err.message);
    res.status(500).json({ error: "Ошибка перевода" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
