import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory, NavLink } from "react-router-dom"


export const AdminBar = () => 
{
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => { 
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

//    console.log(auth.decoded)

    return(
        <nav>
            <div className="nav-wrapper card blue-grey darken-1">
                    <li>
                    <a href="esc" onClick = {logoutHandler}>Выйти</a>
                    <NavLink to="/register"> Регистрация пользователя</NavLink>
                    </li>
                    
            </div>
        </nav>
        )

    
}