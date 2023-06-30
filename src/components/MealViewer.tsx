import { useLoaderData } from 'react-router-dom'

import MealComponent from './MealComponent'
import RecipeDoesntExist from './RecipeDoesntExist'
import { Meal } from 'types/Meal'

type Props = {}

function MealViewer({}: Props) {
  const meal = useLoaderData() as Meal

  return (
    <>
      {meal === null ? <RecipeDoesntExist /> : <MealComponent oneMeal={meal} />}
    </>
  )
}

export default MealViewer
