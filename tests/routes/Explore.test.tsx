//TODO check rendering of meals

import React from 'react'
import { act } from 'react-dom/test-utils'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, vi } from 'vitest'

import Explore from '../../src/components/Explore'

//MemoryRouter doesn't work with data API-s
//https://reactrouter.com/en/6.14.0/routers/create-memory-router
const INITIAL_MEAL = {
  meals: [
    {
      strMeal: 'Chick-Fil-A Sandwich',
      strMealThumb: 'https://fakeurl',
      idMeal: '53016'
    },
    {
      strMeal: 'Chicken Couscous',
      strMealThumb: 'https://fakeurl2',
      idMeal: '52850'
    }
  ]
}
const routes = [
  {
    path: '/explore-recipes',
    element: <Explore />,
    loader: () => INITIAL_MEAL
  }
]
const router = createMemoryRouter(routes, {
  initialEntries: ['/explore-recipes']
})

// Mocking fetch
const meals = {
  meals: [
    {
      strMeal: 'Chicken Fajita Mac and Cheese',
      strMealThumb: 'https://fakeurl3',
      idMeal: '52818'
    },
    {
      strMeal: 'Chicken Ham and Leek Pie',
      strMealThumb: 'https://fakeurl4',
      idMeal: '52875'
    }
  ]
}

global.fetch = vi.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

function createFetchResponse(data: any): Response {
  return {
    ok: true,
    json: () => Promise.resolve(data)
  } as Response
}

describe('Explore component', () => {
  beforeEach(() => {
    cleanup()
    mockedFetch.mockReset()
  })

  test('renders the explore component', async () => {
    render(<RouterProvider router={router} />)

    const title = await screen.findByText('Explore Recipes')
    expect(title).toBeInTheDocument()

    const searchInput = await screen.findByRole('form')
    expect(searchInput).toBeInTheDocument()
  })

  test('displays all meals on component render', async () => {
    render(<RouterProvider router={router} />)

    const searchText = await screen.findByText('All recipes')
    expect(searchText).toBeInTheDocument()
    //TODO
  })

  test('input field and subtitle update after submitting the form', async () => {
    render(<RouterProvider router={router} />)
    const userInput = 'chicken'
    const searchInput = (await screen.findByPlaceholderText(
      'Search by main ingredient'
    )) as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: userInput } })
    expect(searchInput.value).toBe(userInput)

    const subtitle = await screen.findByText(`"${userInput}"`)
    expect(subtitle).toBeInTheDocument()
    const textAllMeals = screen.queryAllByAltText('All recipes')
    expect(textAllMeals).toHaveLength(0)
  })

  test('fetch is called with the correct URL', async () => {
    render(<RouterProvider router={router} />)
    const userInput = 'chicken'
    const searchInput = (await screen.findByPlaceholderText(
      'Search by main ingredient'
    )) as HTMLInputElement

    mockedFetch.mockResolvedValueOnce(createFetchResponse(meals))

    await act(() => {
      fireEvent.change(searchInput, { target: { value: userInput } })
      fireEvent.submit(screen.getByRole('form'))
    })

    expect(mockedFetch).toHaveBeenCalledWith(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`
    )

    //TODO
  })

  test('displays reset search button when no meals are found', async () => {
    const emptyMeals = { meals: null }
    render(<RouterProvider router={router} />)

    mockedFetch.mockResolvedValueOnce(createFetchResponse(emptyMeals))
    const searchInput = (await screen.findByPlaceholderText(
      'Search by main ingredient'
    )) as HTMLInputElement

    await act(() => {
      fireEvent.change(searchInput, { target: { value: 'apple' } })
      fireEvent.submit(screen.getByRole('form'))
    })

    const notFoundText = screen.getByText(
      "Sorry, we couldn't find any recipes mathching your search."
    )
    expect(notFoundText).toBeInTheDocument()
    const resetButton = screen.getByText('Reset search')
    expect(resetButton).toBeInTheDocument()
  })

  test('search resets when clicking on "reset search" button', async () => {
    //TODO
  })
})
