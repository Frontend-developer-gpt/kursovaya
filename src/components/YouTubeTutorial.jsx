import React, { useEffect, useState } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyDAMRC-ugJH9eDkbTMNTxdAWW1K1nNAKwE";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export default function YouTubeTutorial({ recipeTitle }) {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (!recipeTitle) return;

    const fetchVideo = async () => {
      try {
        const res = await axios.get(YOUTUBE_SEARCH_URL, {
          params: {
            part: "snippet",
            q: `${recipeTitle} recipe`,
            type: "video",
            key: YOUTUBE_API_KEY,
            maxResults: 1,
          },
        });

        if (res.data.items && res.data.items.length > 0) {
          setVideoId(res.data.items[0].id.videoId);
        }
      } catch (err) {
        console.error("Ошибка при получении видео:", err);
      }
    };

    fetchVideo();
  }, [recipeTitle]);

  if (!videoId) return <p>Видео-урок не найден.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🎥 Видео-урок</h2>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube tutorial"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
