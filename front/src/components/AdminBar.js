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


    return(
        <nav>
            <div className="nav-wrapper card blue-grey darken-1">
            <ul>
                    <li ><a href="esc" onClick = {logoutHandler}>Выйти</a></li>

                    <li><a><NavLink to="/register"> Регистрация </NavLink></a></li>
                    <li><a><NavLink to="/edit">  Редактирование </NavLink></a></li>
            </ul>
                    
            </div>
        </nav>
        )
    
    
}