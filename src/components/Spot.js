
import React from 'react'

const Spot = ({ spot }) => {

  return (
    <li className='spot'>
      {spot.activity} at {spot.location} 
    </li>
  )
}

export default Spot