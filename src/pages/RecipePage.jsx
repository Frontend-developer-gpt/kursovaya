import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyDAMRC-ugJH9eDkbTMNTxdAWW1K1nNAKwE";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Читаем из URL поисковый запрос, чтобы вернуться с ним
  const savedSearch = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);

        // Ищем видео на YouTube
        const youtubeRes = await axios.get(YOUTUBE_SEARCH_URL, {
          params: {
            part: "snippet",
            q: recipeData.title + " recipe",
            key: YOUTUBE_API_KEY,
            maxResults: 1,
            type: "video",
          },
        });

        if (youtubeRes.data.items.length > 0) {
          setVideoId(youtubeRes.data.items[0].id.videoId);
        }
      } catch (error) {
        console.error("Ошибка при загрузке рецепта:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>;

  if (!recipe) return <p style={{ textAlign: "center" }}>Рецепт не найден</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Кнопка назад */}
      <button
        onClick={() => navigate(`/?search=${savedSearch}`)}
        style={{
          padding: "10px 15px",
          marginBottom: "20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Назад
      </button>

      <h1 style={{ textAlign: "center" }}>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          display: "block",
          margin: "20px auto",
          maxWidth: "500px",
          borderRadius: "10px",
        }}
      />

      <h2>Инструкции</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: recipe.instructions || "Нет инструкций",
        }}
        style={{ marginBottom: "30px" }}
      />

      {videoId && (
        <div>
          <h2>🎥 Видео-туториал</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube tutorial"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
