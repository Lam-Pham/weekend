import React, { useState, useEffect } from 'react'
import Spot from './components/Spot'
import spotService from './services/spots'

const App = () => {
  const [spots, setSpots] = useState([])
  const [newActivity, setNewActivity] = useState('')
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    spotService
      .getAll()
      .then(initialSpots => {
      setSpots(initialSpots)
    })
  }, [])

  const addSpot = (event) => {
    event.preventDefault()
    const spotObject = {
      activity: newActivity,
      location: newLocation,
      date: new Date().toISOString(),
    }

    spotService
      .create(spotObject)
        .then(returnedSpot => {
        setSpots(spots.concat(returnedSpot))
        setNewActivity('')
        setNewLocation('')
      })
  }

  const handleActivityChange = (event) => {
    console.log(event.target.value)
    setNewActivity(event.target.value)
  }

  const handleLocationChange = (event) => {
    console.log(event.target.value)
    setNewLocation(event.target.value)
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
          value={newActivity}
          onChange={handleActivityChange}
          placeholder="activity"
        />
        <input
          value={newLocation}
          onChange={handleLocationChange}
          placeholder="location"
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App
