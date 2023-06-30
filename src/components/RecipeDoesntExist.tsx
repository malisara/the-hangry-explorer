import { Link } from 'react-router-dom'

type Props = {}

function RecipeDoesntExist({}: Props) {
  return (
    <>
      <div className="mt-40 text-center text-pink-600 text-2xl">Oops!</div>
      <div className="text-center mt-10">
        The recipe you're trying to see doesn't exist.{' '}
        <div className="mt-5">
          Explore all recipes{' '}
          <span className="text-pink-600">
            <Link to="/explore-recipes">here</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default RecipeDoesntExist
