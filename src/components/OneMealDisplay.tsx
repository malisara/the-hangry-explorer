import { HeartIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

import { Meal } from 'types/Meal'

type Props = {
  meal: Meal
  onMealToggle: (mealId: string) => void
  savedMeals: string[]
}

function OneMealDisplay({ meal, onMealToggle, savedMeals }: Props) {
  const [mealIngredients, setMealIngredients] = useState<string[]>([])
  const [crossOver, sertCrossOver] = useState<boolean[]>([false])

  useEffect(() => {
    setMealIngredients(createAllIngredientsArray(meal))
  }, [])

  function createAllIngredientsArray(meal: Meal): string[] {
    let allIngredients: string[] = []
    meal.arrIngredients?.forEach((ingredient: string, index: number) => {
      if (meal.arrMeasures && meal.arrMeasures[index]) {
        allIngredients.push(meal.arrMeasures[index] + ' ' + ingredient)
      } else {
        allIngredients.push(ingredient)
      }
    })
    return allIngredients
  }

  useEffect(() => {
    //create an array of cross-over values and set them to false
    sertCrossOver(Array(mealIngredients.length).fill(false))
  }, [mealIngredients])

  function handleCrossOver(index: number): void {
    const updateCrossover = [...crossOver]
    updateCrossover[index] = !updateCrossover[index]
    sertCrossOver(updateCrossover)
  }

  return (
    <>
      <div className="px-4 mt-24 lg:mt-28 lg:my-10 flex flex-wrap justify-center">
        <div className="md:w-1/2 xl:w-1/3">
          <img src={meal.strMealThumb} className="rounded-md drop-shadow-lg" />
        </div>

        <div className="md:w-1/2 xl:w-1/3 px-4 bg-pink-100 rounded-md py-6">
          <div className="flex flex-col ps-5">
            <div className="text-pink-600 text-4xl mb-6 mt-5 lg:mt-0 text-center lg:text-start">
              {meal.strMeal}

              <button onClick={() => onMealToggle(meal.idMeal)}>
                <HeartIcon
                  data-testid={'heart-icon'}
                  className={`h-8 text-gray-400
                 hover:text-pink-300 inline ms-5
                 ${savedMeals.includes(meal.idMeal) && 'text-pink-600'}`}
                />
              </button>
            </div>

            <ul className="py-1 lg:py-5 w-fit">
              {mealIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className={`leading-8 hover:cursor-pointer ${
                    crossOver[index] && 'line-through'
                  }`}
                  onClick={() => handleCrossOver(index)}
                >
                  - {ingredient}
                </li>
              ))}
            </ul>

            <div className="leading-7 mt-4">{meal.strInstructions}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneMealDisplay
