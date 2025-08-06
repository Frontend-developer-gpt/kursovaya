function RecipeCard({ recipe }) {
  return (
    <div className="flex bg-white rounded-lg shadow p-4 mb-4 items-center">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-32 h-32 object-cover rounded mr-4"
        />
      )}
      <div>
        <h2 className="text-lg font-semibold mb-1">{recipe.title}</h2>
        <p className="text-sm text-gray-700">{recipe.summary?.replace(/<[^>]+>/g, '').slice(0, 150)}...</p>
      </div>
    </div>
  );
}

export default RecipeCard;
