import { fetchMeals } from 'utils/utils'
import { Meal } from '../types/Meal'

//loads the data before the component is sent to the client
async function mealsLoader(): Promise<Meal[]> {
  return fetchMeals()
}

export default mealsLoader
