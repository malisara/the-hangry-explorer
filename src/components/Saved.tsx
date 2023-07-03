import { useState } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'

import ExploreMealsBtn from './FindMealBtn'
import MealComponent from './MealComponent'
import Spinner from './Spinner'
import Title from './Title'
import { Meal } from '../types/Meal'
import { getSavedMealsIds } from 'utils/utils'

function Saved(): JSX.Element {
  const initalSavedMeals = useLoaderData() as Meal[]
  const [meals, setMeals] = useState<Meal[]>(initalSavedMeals)
  const [savedMealsIds, setSavedMealsIds] = useState<string[]>(
    getSavedMealsIds()
  )
  const navigation = useNavigation()

  function handleMealUnsave(mealId: string): void {
    if (savedMealsIds.includes(mealId)) {
      const updatedMealsIds = savedMealsIds.filter((id) => id !== mealId)
      setSavedMealsIds(updatedMealsIds)
      const updatedMeals = meals.filter((meal) => meal.idMeal !== mealId)
      setMeals(updatedMeals)
    }
  }

  return (
    <>
      {navigation.state === 'loading' && <Spinner />}
      <Title title={'Saved Recipes'} />
      {meals.length > 0 ? (
        <MealComponent meals={meals} handleMealUnsave={handleMealUnsave} />
      ) : (
        <>
          <div className="text-center mt-10 text-xl ">No meals saved yet</div>
          <div className="flex justify-center">
            <ExploreMealsBtn />
          </div>
        </>
      )}
    </>
  )
}

export default Saved
