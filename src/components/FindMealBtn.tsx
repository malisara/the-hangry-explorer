import { Link } from 'react-router-dom'

function ExploreMealsBtn(): JSX.Element {
  return (
    <button
      className="text-lg border-2 border-pink-300 px-4 py-2 mt-12 
    rounded-lg hover:bg-pink-400 text-pink-400 hover:text-white"
    >
      <Link to="/explore-recipes" className="block">
        Find your new favourite meal!
      </Link>
    </button>
  )
}

export default ExploreMealsBtn
