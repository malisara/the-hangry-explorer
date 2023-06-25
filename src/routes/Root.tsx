import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from 'components/Navbar'

type Props = {}

function Root({}: Props): JSX.Element {
  const [navOnTop, setNavOnTop] = useState<boolean>(true)
  let [isHomeRoute, setIsHomeRoute] = useState<boolean>(
    location.pathname === '/'
  )

  function handleClick() {
    setIsHomeRoute(location.pathname === '/')
  }

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
      <Navbar
        transparentNav={isHomeRoute && navOnTop ? true : false}
        onClick={handleClick}
      />
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
