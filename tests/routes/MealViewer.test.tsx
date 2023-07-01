import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { expect } from 'vitest'

import { detailMeal } from '../constants'
import MealViewer from '../../src/components/MealViewer'

const routesWithMeal = [
  {
    path: '/meal/:id',
    element: <MealViewer />,
    loader: () => detailMeal
  }
]
const routerWithMeal = createMemoryRouter(routesWithMeal, {
  initialEntries: ['/meal/:id']
})

const routesWithNull = [
  {
    path: '/meal/:id',
    element: <MealViewer />,
    loader: () => null
  }
]

const routerWithNull = createMemoryRouter(routesWithNull, {
  initialEntries: ['/meal/:id']
})

describe('OneMealDisplay component', () => {
  test('renders MealComponent when meal !== null', () => {
    render(<RouterProvider router={routerWithMeal} />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()

    const title = screen.getByText('Test1')
    expect(title).toBeInTheDocument()
  })

  test('renders RecipeDoesntExist when meal === null', () => {
    render(<RouterProvider router={routerWithNull} />)
    const title = screen.getByText('Oops!')
    expect(title).toBeInTheDocument()

    const text = screen.getByText(/Explore all recipes/)
    expect(text).toBeInTheDocument()

    const linkElement = screen.getByRole('link', { name: /here/i })
    expect(linkElement).toBeInTheDocument()
  })
})
