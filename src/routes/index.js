import React from 'react'
import { useRoutes } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
import Other from '../pages/Other'

export default function RouteElement() {
  const element = useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home keyName="home" />
        },
        {
          path: "other",
          element: <Other keyName="other" />
        }
      ]
    }
  ])

  return element
}