import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import LogoPink from '../assets/LogoPink.png'
import LogoWhite from '../assets/LogoWhite.png'
import useMediaQuery from 'hooks/useMediaQuery'

type Props = {
  transparentNav: boolean
  onClick: () => void
}

function Navbar({ transparentNav, onClick }: Props): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 1060px)')
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const navbarBg = transparentNav
    ? 'bg-transparent text-pink-100'
    : 'bg-pink-200 drop-shadow'
  const navbarTextColor = transparentNav
    ? 'hover:text-pink-200'
    : 'hover:text-pink-600'

  return (
    <nav className="z-10 fixed top-0 w-full" onClick={onClick}>
      <div
        className={`${navbarBg} flex text-lg items-center justify-between 
        px-10 py-1`}
      >
        {transparentNav ? (
          <NavLink to="/">
            <img className="h-14" src={LogoWhite} alt="Logo White" />
          </NavLink>
        ) : (
          <NavLink to="/">
            <img className="h-14" src={LogoPink} alt="Logo Pink" />
          </NavLink>
        )}

        {isDesktop ? (
          <div className="flex justify-start w-11/12 h-8">
            <NavLink
              to="explore-recipes"
              style={({ isActive }) => {
                return {
                  color: isActive ? 'rgb(244 114 182)' : ''
                }
              }}
              className={`${navbarTextColor} pe-6`}
            >
              EXPLORE RECIPES
            </NavLink>

            <NavLink
              to="/saved-recipes"
              style={({ isActive }) => {
                return {
                  color: isActive ? 'rgb(244 114 182)' : ''
                }
              }}
              className={`${navbarTextColor}`}
            >
              SAVED RECIPES
            </NavLink>
          </div>
        ) : (
          <div className="flex">
            <button>
              <Bars3Icon
                className="h-8"
                data-testid="open-sidebar-btn"
                onClick={() => setMobileNavOpen(!isMobileNavOpen)}
              />
            </button>
          </div>
        )}
      </div>

      {!isDesktop && isMobileNavOpen && (
        <div
          className="h-[100%] bg-pink-200 w-3/6 fixed top-0 end-0 flex
         flex-col px-10 py-7"
        >
          <button>
            <XMarkIcon
              className="h-8 float-right hover:text-pink-600"
              data-testid="close-sidebar-btn"
              onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            />
          </button>

          <div className="flex flex-col items-center">
            <NavLink to="/explore-recipes" className="hover:text-pink-600">
              <div className="py-10">EXPLORE RECIPES</div>
            </NavLink>

            <NavLink to="/saved-recipes" className="hover:text-pink-600">
              SAVED RECIPES
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
