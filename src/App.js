import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'
import Layout from './components/Layout'
import Container from './components/Container'
import LoginForm from './components/LoginForm'
import Landing from './components/Landing'
import Header from './components/Header'
import League from './components/League'
import Leagues from './components/Leagues'

import teamService from './services/teams'
import loginService from './services/login'
import leagueService from './services/leagues'



const App = () => {
  const [teams, setTeams] = useState([])
  const [teamName, setTeamName] = useState('')

  const [leagues, setLeagues] = useState([])

  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [player, setPlayer] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    teamService
      .getAll()
      .then(initialTeams => {
      setTeams(initialTeams)
    })
  }, [])

  useEffect(() => {
    leagueService
      .getAll()
      .then(initialLeagues => {
      setLeagues(initialLeagues)
    })
  }, [])

  useEffect(() => {
    const loggedPlayerJSON = window.localStorage.getItem('loggedPlayer')
    if (loggedPlayerJSON) {
      const player = JSON.parse(loggedPlayerJSON)
      setPlayer(player)
      teamService.setToken(player.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const player = await loginService.login({
         email, password
      })

      window.localStorage.setItem(
        'loggedPlayer', JSON.stringify(player)
      ) 
      teamService.setToken(player.token)
      setPlayer(player)
      setEmail('')
      setPassword('')
    } catch (exception) {
    }
  }

  const addTeam = (event) => {
    event.preventDefault()
    const teamObject = {
      name: teamName,
      date: new Date().toISOString(),
    }

    teamService
      .create(teamObject)
        .then(returnedTeam => {
        setTeams(teams.concat(returnedTeam))
        setTeamName('')
      })
  }

  const handleTeamNameChange = (event) => {
    console.log(event.target.value)
    setTeamName(event.target.value)
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
            password={password}
            email={email}
            handleEmailChange={({ target }) => setEmail(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
}

  const teamForm = () => (
    <form onSubmit={addTeam}>
      <input
        class ="rounded border-2 border-gray-300 bg-blue-50"
        value={teamName}
        onChange={handleTeamNameChange}
        placeholder="team name"
      />
      <button type="submit">save</button>
    </form>  
  )

  const match = useRouteMatch('/leagues/:url')
  const league = match 
    ? leagues.find(league => league.url === String(match.params.url))
    : null

  return (
    <Layout>
      <Container>
        <Header/>
        <Switch>
            <Route path="/leagues/:url">
                <League league={league}/>             
            </Route>
            <Route path="/leagues">
                <Leagues leagues={leagues || {}}/>             
            </Route>
            <Route path="/about">
                <Landing/>
            </Route>
            <Route path="/">
                <Landing latestLeague={leagues[0] || {}}/>
            </Route>
        </Switch>
                                  
        <div class="block space-y-8">
          {player === null ?
            loginForm() : 
            <div>
              <p>Hello, {player.name}</p>
              {teamForm()}
            </div>
          }
        </div>
      </Container>
    </Layout>
  )
}

export default App
