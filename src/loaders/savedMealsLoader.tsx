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

export async function fetchOneMeal(
  mealId: string,
  detailedDisplay?: boolean
): Promise<Meal | undefined> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    )

    if (response.ok) {
      const json = await response.json()

      if (json.meals) {
        const mealObj = json.meals[0]

        if (detailedDisplay) {
          return _getDetailedMeal(mealObj)
        } else {
          const parsedMeal = new Meal(
            mealObj.idMeal,
            mealObj.strMeal,
            mealObj.strMealThumb
          )
          return parsedMeal
        }
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

function _getDetailedMeal(meal: any) {
  const ingredients = []
  const measures = []

  for (const key in meal) {
    if (key.startsWith('strIngredient')) {
      if (_isNotEmpty(meal[key])) {
        ingredients.push(meal[key])
      }
    }

    if (key.startsWith('strMeasure')) {
      if (_isNotEmpty(meal[key])) {
        measures.push(meal[key])
      }
    }
  }

  return new Meal(
    meal.idMeal,
    meal.strMeal,
    meal.strMealThumb,
    meal.strInstructions,
    ingredients,
    measures
  )
}

function _isNotEmpty(value: string): boolean {
  return value !== undefined && value !== null && value.length > 0
}
