import React, { useState, useEffect } from 'react'
import Container from './components/Container'
import Art from './components/Art'
import Collection from './components/Collection'
import LoginForm from './components/LoginForm'

import artService from './services/arts'
import loginService from './services/login'
import collectionService from './services/collections'

const App = () => {
  const [arts, setArts] = useState([])
  const [newPiece, setNewPiece] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const [collections, setCollections] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    artService
      .getAll()
      .then(initialArts => {
      setArts(initialArts)
    })
  }, [])

  useEffect(() => {
    collectionService
      .getAll()
      .then(initialCollections => {
      setCollections(initialCollections)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedArtappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      artService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedArtappUser', JSON.stringify(user)
      ) 
      artService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
    }
    console.log('logging in with', username, password)
  }

  const addArt = (event) => {
    event.preventDefault()
    const artObject = {
      piece: newPiece,
      description: newDescription,
      date: new Date().toISOString(),
    }

    artService
      .create(artObject)
        .then(returnedArt => {
        setArts(arts.concat(returnedArt))
        setNewPiece('')
        setNewDescription('')
      })
  }

  const handlePieceChange = (event) => {
    console.log(event.target.value)
    setNewPiece(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    console.log(event.target.value)
    setNewDescription(event.target.value)
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

  const artForm = () => (
    <form onSubmit={addArt}>
      <input
        class ="rounded border-2 border-gray-300 bg-blue-50"
        value={newPiece}
        onChange={handlePieceChange}
        placeholder="piece"
      />
      <input
        class ="rounded border-2 border-gray-300 bg-blue-50"
        value={newDescription}
        onChange={handleDescriptionChange}
        placeholder="description"
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <Container>
      <div class="block space-y-8">
        <h1 class="font-bold">Sunday Scribbles</h1>

        {user === null ?
          loginForm() : 
          <div>
            <p>Hello, {user.username}</p>
            {artForm()}
          </div>
        }

        <ul class="list-decimal list-inside">
          {collections.map(collection => 
              <Collection
                key={collection.id}
                collection={collection} 
              />
          )}
        </ul>

        <ul class="list-decimal list-inside">
          {arts.map(art => 
              <Art
                key={art.id}
                art={art} 
              />
          )}
        </ul>
      </div>
    </Container>
  )
}

export default App
