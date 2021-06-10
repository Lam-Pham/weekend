import React, { useState, useEffect } from 'react'
import Container from './components/Container'
import Spot from './components/Spot'
import LoginForm from './components/LoginForm'
import spotService from './services/spots'
import loginService from './services/login'

const App = () => {
  const [spots, setSpots] = useState([])
  const [newActivity, setNewActivity] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
      spotService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
}

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
      <div class="block space-y-8">
        <h1 class="font-bold">Weekend</h1>

        {user === null ?
          loginForm() : 
          <div>
            <p>Hello, {user.name}</p>
            {spotForm()}
          </div>
        }

        <ul class="list-decimal list-inside">
          {spots.map(spot => 
              <Spot
                key={spot.id}
                spot={spot} 
              />
          )}
        </ul>
      </div>
    </Container>
  )
}

export default App
