import { fetchOneMeal, getSavedMealsIds } from 'utils/utils'
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

export default savedMealsLoader
