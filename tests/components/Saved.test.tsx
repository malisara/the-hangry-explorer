import React from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import Saved from '../../src/components/Saved'
import { LS_KEY } from '../../src/utils/constants'
import { Meal } from '../../src/types/Meal'
import localStorageMock from '../utils'

const SAVED_MEALS = [
  new Meal('Test1', 'https://fakeurl1', '1'),
  new Meal('Test2', 'https://fakeurl2', '1'),
  new Meal('Test3', 'https://fakeurl3', '3')
]

//Loader
const routes = [
  {
    path: '/saved-recipes',
    element: <Saved />,
    loader: () => SAVED_MEALS
  }
]

const router = createMemoryRouter(routes, {
  initialEntries: ['/saved-recipes']
})

//LS mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock() })

describe('Saved meals component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders the component', () => {
    render(<RouterProvider router={router} />)

    const title = screen.getByText('Saved Recipes')
    expect(title).toBeInTheDocument()
  })

  test('renders saved meals', () => {
    render(<RouterProvider router={router} />)

    const meals = screen.getAllByRole('img')
    expect(meals.length).toBe(SAVED_MEALS.length)
  })

  test('handles meal unsave', () => {
    localStorage.setItem(LS_KEY, JSON.stringify(['Test1', 'Test2', 'Test3']))
    render(<RouterProvider router={router} />)

    const mealsBeforeUnsave = screen.getAllByRole('img')
    expect(mealsBeforeUnsave.length).toBe(SAVED_MEALS.length)

    const unsaveBtn = screen.getAllByTestId('save-meal-btn')
    fireEvent.click(unsaveBtn[0])

    const meals = screen.getAllByRole('img')
    expect(meals.length).toBe(SAVED_MEALS.length - 1)

    const unsaveBtnAfter = screen.getAllByTestId('save-meal-btn')
    expect(unsaveBtnAfter.length).toBe(unsaveBtn.length - 1)
  })

  test('renders component when no meals are saved', async () => {
    const NO_SAVED_MEALS = []

    const routes = [
      {
        path: '/saved-recipes',
        element: <Saved />,
        loader: () => NO_SAVED_MEALS
      }
    ]
    const router = createMemoryRouter(routes, {
      initialEntries: ['/saved-recipes']
    })

    render(<RouterProvider router={router} />)

    const findMealsBtn = await screen.findByRole('button')
    expect(findMealsBtn).toBeInTheDocument()

    const meals = screen.queryAllByRole('img')
    expect(meals.length).toBe(0)

    const noMealsText = screen.getByText('No meals saved yet')
    expect(noMealsText).toBeInTheDocument()
  })
})
