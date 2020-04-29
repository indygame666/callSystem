import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { NavBar} from './components/Navbar'
import { AdminBar } from './components/AdminBar'
import { Loader } from './components/Loader'
import { useHttp } from './hooks/http.hooks'

function App() {
  
  const {token, login,logout,userId, decoded, ready} = useAuth()

  const {loading} = useHttp()
  
  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated,decoded)

  if (loading)
    {
        return <Loader/>
    }

  return (
    <AuthContext.Provider value={{
      token, login,logout,userId, isAuthenticated, decoded, ready
    }}>
      <Router>
       {isAuthenticated &&  decoded === "client" && <NavBar/>}
       {isAuthenticated &&  decoded === "admin" && <AdminBar/>}
        <div className="container">
        {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
