import { useEffect, useState } from 'react'
import { Meal } from 'types/Meal'
import MealsDisplay from './MealsDisplay'

type Props = {
  meals?: Meal[]
}

function MealComponent({ meals }: Props) {
  const [savedMealsIds, setSavedMealsIds] = useState<string[]>([])
  const savedMealsFromLocalStorage: string[] = JSON.parse(
    localStorage.getItem('SAVED_MEALS') || '[]'
  )

  useEffect(() => {
    setSavedMealsIds(savedMealsFromLocalStorage)
  }, [])

  const toggleMealSave = (mealId: string) => {
    const updatedSavedMeals = savedMealsIds.includes(mealId)
      ? savedMealsIds.filter((id) => id !== mealId)
      : [...savedMealsIds, mealId]

    setSavedMealsIds(updatedSavedMeals)
    localStorage.setItem('SAVED_MEALS', JSON.stringify(updatedSavedMeals))
  }

  return (
    meals && (
      <MealsDisplay
        meals={meals}
        onMealToggle={toggleMealSave}
        savedMeals={savedMealsIds}
      />
    )
  ) //TODO else
}

export default MealComponent
