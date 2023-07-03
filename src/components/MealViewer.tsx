import { useLoaderData, useNavigation } from 'react-router-dom'

import MealComponent from './MealComponent'
import RecipeDoesntExist from './RecipeDoesntExist'
import Spinner from './Spinner'
import { Meal } from 'types/Meal'

function MealViewer(): JSX.Element {
  const meal = useLoaderData() as Meal
  const navigation = useNavigation()

  return (
    <>
      {navigation.state === 'loading' && <Spinner />}

      {meal === null ? <RecipeDoesntExist /> : <MealComponent meals={meal} />}
    </>
  )
}

export default MealViewer
