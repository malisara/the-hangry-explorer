import { Meal } from 'types/Meal'
import { fetchOneMeal } from 'utils/utils'

async function singleMealLoader(id: string | undefined): Promise<Meal | null> {
  if (id === undefined) {
    return null
  }

  const meal = await fetchOneMeal(id, true)
  return meal !== undefined ? meal : null
}

export default singleMealLoader
