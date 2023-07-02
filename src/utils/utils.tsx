import { Meal } from 'types/Meal'
import { LS_KEY } from './constants'

export function getSavedMealsIds(): string[] {
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
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

export async function fetchMeals(searchInput: string = ''): Promise<Meal[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
    )
    if (response.ok) {
      const json = await response.json()
      if (json.meals) {
        const parsedMeals = json.meals.map((mealObj: any) => {
          return new Meal(mealObj.idMeal, mealObj.strMeal, mealObj.strMealThumb)
        })
        return parsedMeals
      } else {
        return []
      }
    } else {
      throw new Error('Failed to fetch meals')
    }
  } catch (error) {
    throw error
  }
}
