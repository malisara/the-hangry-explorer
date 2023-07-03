import { CiPizza } from 'react-icons/ci'

function Spinner(): JSX.Element {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-75
     bg-gray-500 z-50"
    >
      <CiPizza className="w-16 h-16 animate-spin text-black" />
    </div>
  )
}

export default Spinner
