import { HeartIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Meal } from 'types/Meal'

type Props = {
  meals: Meal[]
  onMealToggle: (mealId: string) => void
  savedMeals: string[]
}

function MealsDisplay({ meals, onMealToggle, savedMeals }: Props): JSX.Element {
  const displayLimit = 10
  const [visibleMeals, setVisibleMeals] = useState(displayLimit)

  function displayMoreMeals(): void {
    setVisibleMeals((prevVisibleMeals) => {
      return prevVisibleMeals + displayLimit
    })
  }

  return (
    <>
      <div
        className="flex w-5/8 px-4 py-5 gap-7 flex-wrap 
    justify-center flex-col md:flex-row"
      >
        {meals.slice(0, visibleMeals).map((meal) => (
          <div
            key={meal.idMeal}
            className="flex flex-col md:w-1/3 lg:w-1/4 2xl:w-1/5"
          >
            <Link to={`/`} className="hover:opacity-80">
              {/* todo */}
              <img
                src={meal.strMealThumb}
                className="rounded-md hover:drop-shadow-lg"
              />
            </Link>
            <div className="text-center py-2 text-lg">
              {meal.strMeal}
              <button
                data-testid="save-meal-btn"
                onClick={() => onMealToggle(meal.idMeal)}
              >
                <HeartIcon
                  className={`h-6 inline ml-2 text-gray-400
                   hover:text-pink-300 
                   ${savedMeals.includes(meal.idMeal) && 'text-pink-600'}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleMeals < meals.length && (
        <div className="flex justify-center mt-4 mb-20">
          <button
            onClick={displayMoreMeals}
            className="p-4 bg-pink-200 hover:bg-pink-300
           hover:text-white rounded-md"
          >
            Show more meals
          </button>
        </div>
      )}
    </>
  )
}

export default MealsDisplay
