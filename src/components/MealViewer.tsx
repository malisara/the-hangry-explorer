import { useLoaderData } from 'react-router-dom'

import MealComponent from './MealComponent'
import RecipeDoesntExist from './RecipeDoesntExist'
import { Meal } from 'types/Meal'

function MealViewer(): JSX.Element {
  const meal = useLoaderData() as Meal

  return (
    <>
      {meal === null ? <RecipeDoesntExist /> : <MealComponent meals={meal} />}
    </>
  )
}

export default MealViewer
