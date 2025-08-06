import axios from "axios";

// Функция перевода текста с русского на английский
export async function translateToEnglish(text) {
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "ru",
      target: "en",
      format: "text",
    }, {
      headers: {
        accept: "application/json",
      },
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("Ошибка перевода:", error);
    return text; // fallback — если перевод сломался, вернём оригинал
  }
}
