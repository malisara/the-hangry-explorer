import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, vi } from 'vitest'

import Navbar from '../../src/components/Navbar'

describe('Desktop navbar', () => {
  test("renders white logo when 'transparentNav' is true", () => {
    render(
      <MemoryRouter>
        <Navbar transparentNav={true} />
      </MemoryRouter>
    )
    const whiteLogo = screen.getByAltText('Logo White')
    expect(whiteLogo).toBeInTheDocument()
    const pinkLogo = screen.queryByAltText('Logo Pink')
    expect(pinkLogo).not.toBeInTheDocument()
  })

  test("renders pink logo when 'transparentNav' is false", () => {
    render(
      <MemoryRouter>
        <Navbar transparentNav={false} />
      </MemoryRouter>
    )
    const pinkLogo = screen.getByAltText('Logo Pink')
    expect(pinkLogo).toBeInTheDocument()
    const whiteLogo = screen.queryByAltText('Logo White')
    expect(whiteLogo).not.toBeInTheDocument()
  })
})

describe('Mobile navbar', () => {
  test('mobile sidebar is closed by default', () => {
    render(
      <MemoryRouter>
        <Navbar transparentNav={true} />
      </MemoryRouter>
    )
    const closeSidebarBtnBeforeClick = screen.queryByTestId('close-sidebar-btn')
    expect(closeSidebarBtnBeforeClick).not.toBeInTheDocument()

    const openSidebarBtn = screen.getByTestId('open-sidebar-btn')
    fireEvent.click(openSidebarBtn)

    const closeSidebarBtnAfterClick = screen.queryByTestId('close-sidebar-btn')
    expect(closeSidebarBtnAfterClick).toBeInTheDocument()
  })

  test("opens sidebar when 'open-sidebar-btn- is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar transparentNav={true} />
      </MemoryRouter>
    )

    const openSidebarBtn = screen.getByTestId('open-sidebar-btn')
    fireEvent.click(openSidebarBtn)

    const closeSidebarBtn = screen.queryByTestId('close-sidebar-btn')
    expect(closeSidebarBtn).toBeInTheDocument()
  })

  test("closes sidebar when 'close-sidebar-btn- is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar transparentNav={true} />
      </MemoryRouter>
    )

    const openSidebarBtn = screen.getByTestId('open-sidebar-btn')
    fireEvent.click(openSidebarBtn)

    const closeSidebarBtn = screen.getByTestId('close-sidebar-btn')
    fireEvent.click(closeSidebarBtn)

    expect(closeSidebarBtn).not.toBeInTheDocument()
  })
})
