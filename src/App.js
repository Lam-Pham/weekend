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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSpotappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedSpotappUser', JSON.stringify(user)
      ) 
      spotService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const loginForm = () => (
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
  )

  const spotForm = () => (
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
  )

  return (
    <Container>
      <h1>Spots</h1>

      {user === null ?
        loginForm() : 
        <div>
          <p>Hello, {user.name}</p>
          {spotForm()}
        </div>
      }

      <ul>
        {spots.map(spot => 
            <Spot
              key={spot.id}
              spot={spot} 
            />
        )}
      </ul>
    </Container>
  )
}

export default App
