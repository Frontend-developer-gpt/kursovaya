import React, { useState } from "react";
import { searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (error) {
      console.error("Ошибка при поиске рецептов:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Поиск рецептов</h1>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Например: борщ, салат, курица..."
          className="flex-grow p-2 rounded-l border border-gray-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
        >
          Найти
        </button>
      </div>

      {loading && <p>Загрузка...</p>}

      {!loading && recipes.length === 0 && (
        <p className="text-gray-500">Ничего не найдено.</p>
      )}

      {!loading &&
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
}

export default Home;
