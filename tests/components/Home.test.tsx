import React from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'
import 'intersection-observer'
//Framer motion uses IntersectionObserver
//but it isn't available by default

const routes = [
  //useNavigation() doesn't work with memory router
  {
    path: '/',
    element: <Home />
  }
]
const router = createMemoryRouter(routes, {
  initialEntries: ['/']
})

import Home from '../../src/components/Home'

describe('Homepage', () => {
  test('renders the home page', () => {
    render(<RouterProvider router={router} />)

    const pageTitle = screen.getByText('THE HANGRY EXPLORER')
    expect(pageTitle).toBeInTheDocument()

    const heroImage = screen.getByRole('img')
    expect(heroImage).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toEqual('/explore-recipes')
  })
})
