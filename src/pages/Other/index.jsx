import React from 'react'
import { useLocation } from 'react-router-dom'

const Other = () => {
  const props = useLocation()
  console.log('other',props)
  return (
    <div>Other</div>
  )
}

export default Other