import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import MealComponent from '../../src/components/MealComponent'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import { detailMeal } from '../constants'
import { Meal } from '../../src/types/Meal'
import { LS_KEY } from '../../src/utils/constants'
import localStorageMock from '../utils'

const displayLimitMeals = 10
const meals = [
  new Meal('Test1', 'https://fakeurl1', '1'),
  new Meal('Test2', 'https://fakeurl2', '1'),
  new Meal('Test3', 'https://fakeurl3', '3'),
  new Meal('Test4', 'https://fakeurl4', '4'),
  new Meal('Test5', 'https://fakeurl5', '5'),
  new Meal('Test6', 'https://fakeurl6', '6'),
  new Meal('Test7', 'https://fakeurl7', '7'),
  new Meal('Test8', 'https://fakeurl8', '8'),
  new Meal('Test9', 'https://fakeurl9', '9'),
  new Meal('Test10', 'https://fakeurl10', '10'),
  new Meal('Test11', 'https://fakeurl11', '11')
]

//LS mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock() })

describe('Meal component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders limited amount of meals with "show more meals" button', () => {
    render(
      <MemoryRouter>
        <MealComponent meals={meals} />
      </MemoryRouter>
    )

    const mealImages = screen.getAllByRole('img')
    expect(mealImages).toHaveLength(displayLimitMeals)

    const loadMoreBtn = screen.getByText('Show more meals')
    expect(loadMoreBtn).toBeInTheDocument()
  })

  test('displays more meals when "show more meals" button is clicked', () => {
    render(
      <MemoryRouter>
        <MealComponent meals={meals} />
      </MemoryRouter>
    )

    const loadMoreBtn = screen.getByText('Show more meals')
    fireEvent.click(loadMoreBtn)

    const mealImages = screen.getAllByRole('img')
    expect(mealImages).toHaveLength(meals.length)

    const loadMoreBtnWhenNoMoreMeals = screen.queryByText('Show more meals')
    expect(loadMoreBtnWhenNoMoreMeals).not.toBeInTheDocument()
  })

  test('handles saving and unsaving meal to/from the LS', () => {
    render(
      <MemoryRouter>
        <MealComponent meals={meals} />
      </MemoryRouter>
    )

    const saveMealBtns = screen.getAllByTestId('save-meal-btn')
    //save first & second meal to the ls
    fireEvent.click(saveMealBtns[0])
    fireEvent.click(saveMealBtns[1])
    const allItemsLs = JSON.parse(localStorage.getAll()[LS_KEY])
    expect(allItemsLs).toHaveLength(2)

    //unsaves first meal
    fireEvent.click(saveMealBtns[0])
    const allItemsLsAfterUnsave = JSON.parse(localStorage.getAll()[LS_KEY])
    expect(allItemsLsAfterUnsave).toHaveLength(1)

    //second meal remains in the ls
    const remainingLsItem = JSON.parse(localStorage.getItem(LS_KEY) || '[]')[0]
    expect(remainingLsItem).toBe(meals[1].idMeal)
  })

  test('renders detail view when one meal is sent as prop', () => {
    render(
      <MemoryRouter>
        <MealComponent meals={detailMeal} />
      </MemoryRouter>
    )

    const mealImages = screen.getAllByRole('img')
    expect(mealImages).toHaveLength(1)

    const instructions = screen.getByText('fake instructions')
    expect(instructions).toBeInTheDocument()
  })
})
