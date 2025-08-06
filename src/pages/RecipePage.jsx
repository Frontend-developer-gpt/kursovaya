import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../services/api'

function RecipePage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipeById(id)
      setRecipe(data)
    }
    fetchData()
  }, [id])

  if (!recipe) return <p className="text-center mt-10">Загрузка...</p>

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="w-full rounded mb-4" />
      )}

      {recipe.extendedIngredients && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Ингредиенты:</h2>
          <ul className="list-disc list-inside">
            {recipe.extendedIngredients.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Инструкции:</h2>
          <p>{recipe.instructions}</p>
        </div>
      )}

      {recipe.sourceUrl && (
        <div className="mt-6">
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Смотреть полную инструкцию или видео
          </a>
        </div>
      )}
    </div>
  )
}

export default RecipePage
