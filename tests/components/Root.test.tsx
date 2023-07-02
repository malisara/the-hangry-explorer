import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'

import Root from '../../src/routes/Root'

describe('Root layout', () => {
  test('renders navbar and footer', () => {
    //mobile display by default
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    )

    const footer = screen.getByText('The Hangry Explorer')
    expect(footer).toBeInTheDocument()
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
  })
})
