import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from 'components/Navbar'

type Props = {}

function Root({}: Props): JSX.Element {
  const [navOnTop, setNavOnTop] = useState<boolean>(true)
  const location = useLocation()
  //returns a new location whenever the URL changes
  const [isHomeRoute, setIsHomeRoute] = useState<boolean>(
    location.pathname === '/'
  )

  useEffect(() => {
    setIsHomeRoute(location.pathname === '/')
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setNavOnTop(true)
      } else setNavOnTop(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      <Navbar transparentNav={isHomeRoute && navOnTop && true} />
      <Outlet />

      <footer
        className="fixed bottom-0 h-10 w-full bg-pink-200 text-center
      justify-center pt-2"
      >
        The Hangry Explorer
      </footer>
    </>
  )
}

export default Root
