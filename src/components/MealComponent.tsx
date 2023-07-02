import { useState } from 'react'

import MealsDisplay from './MealsDisplay'
import OneMealDisplay from './OneMealDisplay'

import { Meal } from 'types/Meal'
import { LS_KEY } from 'utils/constants'
import { getSavedMealsIds } from 'utils/utils'

type Props = {
  meals: Meal[] | Meal
  handleMealUnsave?: (mealId: string) => void
}

function MealComponent({ meals, handleMealUnsave }: Props): JSX.Element {
  const [savedMealsIds, setSavedMealsIds] = useState<string[]>(
    getSavedMealsIds()
  )

  const toggleMealSave = (mealId: string) => {
    const updatedSavedMeals = savedMealsIds.includes(mealId)
      ? savedMealsIds.filter((id) => id !== mealId)
      : [...savedMealsIds, mealId]

    setSavedMealsIds(updatedSavedMeals)
    localStorage.setItem(LS_KEY, JSON.stringify(updatedSavedMeals))

    if (handleMealUnsave !== undefined) {
      handleMealUnsave(mealId)
    }
  }

  return Array.isArray(meals) ? (
    <MealsDisplay
      meals={meals}
      onMealToggle={toggleMealSave}
      savedMeals={savedMealsIds}
    />
  ) : (
    <OneMealDisplay
      meal={meals}
      onMealToggle={toggleMealSave}
      savedMeals={savedMealsIds}
    />
  )
}

export default MealComponent
