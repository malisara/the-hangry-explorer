import { Meal } from '../types/Meal'

//loads the data before the component is sent to the client
async function mealsLoader(): Promise<Meal[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=`
    )
    if (response.ok) {
      const json = await response.json()
      if (json.meals !== null) {
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

export default mealsLoader
