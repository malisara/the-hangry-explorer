import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'
import 'intersection-observer'
//Framer motion uses IntersectionObserver
//but it isn't available by default

import Home from '../../src/components/Home'

describe('Homepage', () => {
  test('renders the home page with the title and button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const pageTitle = await screen.findByText('THE HANGRY EXPLORER')
    expect(pageTitle).toBeInTheDocument()

    const heroImage = await screen.findByRole('img')
    expect(heroImage).toBeInTheDocument()

    const button = await screen.findByRole('button')
    expect(button).toBeInTheDocument()

    const link = await screen.findByRole('link')
    expect(link.getAttribute('href')).toEqual('/explore-recipes')
  })
})
