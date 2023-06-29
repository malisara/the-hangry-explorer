import { getSavedMealsIds } from 'utils/utils'
import { Meal } from 'types/Meal'

async function savedMealsLoader(): Promise<Meal[]> {
  const initialMeals: Meal[] = []
  const savedMealsIds = getSavedMealsIds()

  if (savedMealsIds.length === 0) {
    return []
  }

  for (const mealId of savedMealsIds) {
    const meal = await fetchOneMeal(mealId)

    if (meal !== undefined) {
      initialMeals.push(meal)
    }
  }
  return initialMeals
}

async function fetchOneMeal(mealId: string): Promise<Meal | undefined> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    )

    if (response.ok) {
      const json = await response.json()

      if (json.meals !== null) {
        const mealObj = json.meals[0]
        const parsedMeal = new Meal(
          mealObj.idMeal,
          mealObj.strMeal,
          mealObj.strMealThumb
        )
        return parsedMeal
      } else {
        return undefined
      }
    } else {
      throw new Error('Failed to fetch meals')
    }
  } catch (error) {
    console.error(error)
  }
}

export default savedMealsLoader
