import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { detailMeal } from '../constants'
import OneMealDisplay from '../../src/components/OneMealDisplay'

const onMealToggle = vi.fn()
const savedMeals = ['1']

describe('OneMealDisplay component', () => {
  test('renders the component', () => {
    render(
      <MemoryRouter>
        <OneMealDisplay
          meal={detailMeal}
          onMealToggle={onMealToggle}
          savedMeals={savedMeals}
        />
      </MemoryRouter>
    )

    const img = screen.getAllByRole('img')
    expect(img).toHaveLength(1)

    const title = screen.getByText('Test1')
    expect(title).toBeInTheDocument

    const ingredientsOne = screen.getByText(/measure1 ingredient1/)
    expect(ingredientsOne).toBeInTheDocument

    const ingredientsTwo = screen.getByText(/measure2 ingredient2/)
    expect(ingredientsTwo).toBeInTheDocument

    const instructions = screen.getByText(/fake instructions/)
    expect(instructions).toBeInTheDocument()
  })

  test('handles meal unsave', async () => {
    render(
      <MemoryRouter>
        <OneMealDisplay
          meal={detailMeal}
          onMealToggle={onMealToggle}
          savedMeals={savedMeals}
        />
      </MemoryRouter>
    )

    const button = screen.getByRole('button')

    const heartIconElement = screen.getByTestId('heart-icon')
    expect(heartIconElement).toHaveClass('text-pink-600')

    fireEvent.click(button)
    expect(onMealToggle).toHaveBeenCalled()
  })
})
