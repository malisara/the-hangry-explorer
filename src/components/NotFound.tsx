import { Link, useRouteError } from 'react-router-dom'
import Navbar from './Navbar'

export default function NotFound(): JSX.Element {
  const error: any = useRouteError()

  return (
    <>
      <Navbar transparentNav={false} />
      <div className="text-center mt-32 px-2">
        <h1 className="text-pink-600 text-3xl pb-5 font-semibold">Oops!</h1>
        <p className="my-5 text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="mb-10">
          <i>{error.statusText || error.message}</i>
        </p>

        <Link
          className="text-pink-600 text-lg font-medium underline"
          to="/explore-recipes"
        >
          Getting hangry?
        </Link>
      </div>
    </>
  )
}
