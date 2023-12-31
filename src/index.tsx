import 'tailwindcss/tailwind.css'
import './index.css'

const container = document.getElementById('root') as HTMLDivElement

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'

import Explore from './components/Explore'
import Home from './components/Home'
import Saved from './components/Saved'
import MealViewer from 'components/MealViewer'
import mealsLoader from './loaders/mealsLoader'
import savedMealsLoader from './loaders/savedMealsLoader'
import singleMealLoader from 'loaders/singleMealLoader'
import NotFound from 'components/NotFound'

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/explore-recipes',
        element: <Explore />,
        loader: mealsLoader
      },
      {
        path: '/saved-recipes',
        element: <Saved />,
        loader: savedMealsLoader
      },
      {
        path: '/meal/:id',
        element: <MealViewer />,
        loader: ({ params }) => {
          return singleMealLoader(params.id)
        }
      }
    ]
  }
])

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
