import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router-dom"

export const NavBar = () => 
{
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => { 
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper card blue-grey darken-1">
                    <li><a href="esc" onClick = {logoutHandler}>Выйти</a></li>
            </div>
        </nav>
    )
}