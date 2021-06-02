import React, { useState, useEffect } from 'react'
import Container from './components/Container'
import Spot from './components/Spot'
import spotService from './services/spots'

const App = () => {
  const [spots, setSpots] = useState([])
  const [newActivity, setNewActivity] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    spotService
      .getAll()
      .then(initialSpots => {
      setSpots(initialSpots)
    })
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

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
    <Container>
      <h1>Spots</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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
    </Container>
  )
}

export default App
