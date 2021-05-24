import React, { useState, useEffect } from 'react'
import Spot from './components/Spot'
import spotService from './services/spots'

const App = () => {
  const [spots, setSpots] = useState([])
  const [newSpot, setNewSpot] = useState('')

  useEffect(() => {
    spotService
      .getAll2()
      .then(initialSpots => {
      setSpots(initialSpots)
    })
  }, [])

  const addSpot = (event) => {
    event.preventDefault()
    const spotObject = {
      content: newSpot,
      date: new Date().toISOString(),
    }

    spotService
      .create(spotObject)
        .then(returnedSpot => {
        setSpots(spots.concat(returnedSpot))
        setNewSpot('')
      })
  }

  const handleSpotChange = (event) => {
    console.log(event.target.value)
    setNewSpot(event.target.value)
  }

  return (
    <div>
      <h1>Spots</h1>
      <ul>
        {spots.map(spot => 
            <Spot
              key={spot.id}
              spot={spot} 
            />
        )}
      </ul>
      <form onSubmit={addSpot}>
        <input
          value={newSpot}
          onChange={handleSpotChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App
