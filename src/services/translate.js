import axios from "axios";

const LIBRE_TRANSLATE_URL = "https://libretranslate.de/translate";

export async function translateToEnglish(text) {
  return await translate(text, "ru", "en");
}

export async function translateToRussian(text) {
  return await translate(text, "en", "ru");
}

async function translate(text, from, to) {
  try {
    const response = await axios.post(LIBRE_TRANSLATE_URL, {
      q: text,
      source: from,
      target: to,
      format: "text"
    }, {
      headers: { "Content-Type": "application/json" }
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("Ошибка при переводе:", error);
    return text;
  }
}
