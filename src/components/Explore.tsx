import { useState, useRef } from 'react'
import { useLoaderData } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import Title from './Title'
import { Meal } from '../types/Meal'
import MealComponent from './MealComponent'

function Explore(): JSX.Element {
  const initialMeals = (useLoaderData() as Meal[]) ?? []
  const [meals, setMeals] = useState<Meal[]>(initialMeals)
  const [searchInput, setSearchInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()
    await fetchMealsByMainIngredient(searchInput)
  }

  async function fetchMealsByMainIngredient(ingredient: string) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
      if (response.ok) {
        const json = await response.json()
        if (json.meals) {
          const parsedMeals = json.meals.map((mealObj: any) => {
            return new Meal(
              mealObj.idMeal,
              mealObj.strMeal,
              mealObj.strMealThumb
            )
          })
          setMeals(parsedMeals)
        } else {
          setMeals([])
        }
      } else {
        throw new Error('Failed to fetch meals')
      }
    } catch (error) {
      throw error
    }
  }

  function resetSearchInput() {
    setMeals(initialMeals)
    setSearchInput('')
    if (inputRef.current) {
      //to make sure ref has been assigned to input element (!== null)
      inputRef.current.value = ''
    }
  }

  function handleInputChange(e: React.FocusEvent<HTMLInputElement>): void {
    setSearchInput(e.target.value.trim().toLowerCase())
  }

  return (
    <>
      <Title title={'Explore Recipes'} />
      <div className="flex justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="flex justify-end items-center relative"
          role="form"
        >
          <input
            ref={inputRef}
            placeholder="Search by main ingredient"
            className="border border-gray-400 rounded-lg p-2 w-full
                  focus:outline-none focus:border-pink-400 focus:ring-1
                      focus:ring-pink-200"
            onChange={handleInputChange}
          />
          <button className="absolute mr-2 w-5 hover:text-pink-600">
            <MagnifyingGlassIcon />
          </button>
        </form>
      </div>

      {/* display of search input */}
      <div className="w-4/6 text-center m-auto text-3xl py-4">
        {searchInput === '' ? (
          <div>All recipes</div>
        ) : (
          <div>"{searchInput}"</div>
        )}
      </div>

      {/* meals display */}

      {meals.length !== 0 ? (
        <MealComponent meals={meals} />
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="w-4/6 text-center text-xl lg:text-2xl
           my-10 lg:my-16"
          >
            Sorry, we couldn't find any recipes mathching your search.
          </div>
          <button
            className="drop-shadow p-2 rounded-lg border-gray-400
         bg-pink-200 hover:bg-pink-600 hover:text-white w-1/8 mb-20"
            onClick={resetSearchInput}
          >
            Reset search
          </button>
        </div>
      )}
    </>
  )
}
export default Explore
