import 'tailwindcss/tailwind.css'
import './index.css'

const container = document.getElementById('root') as HTMLDivElement

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from 'routes/Root'
import Explore from 'components/Explore'
import Saved from 'components/Saved'
import Home from 'components/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //TODO errorPage
    children: [
      { index: true, element: <Home /> },
      {
        path: '/explore-recipes',
        element: <Explore />
      },

      {
        path: '/saved-recipes',
        element: <Saved />
      }
    ]
  }
])

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
