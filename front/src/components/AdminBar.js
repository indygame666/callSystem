import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory, NavLink } from "react-router-dom"
import material from  'materialize-css'
import '../css/cards.css'


export const AdminBar = () => 
{
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => { 
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    useEffect(() => {
        let elem = document.querySelectorAll('.dropdown-trigger');
        material.Dropdown.init(elem);
    })

    return(
        
    <div>

        <ul id="dropdown1" className="drop_large dropdown-content">
            <li><NavLink to= "/editAdmin">Администратор</NavLink></li>
            <li><NavLink to= "/editUser">Пациент</NavLink></li>
        </ul>


        <ul id="dropdown2" className="drop_large dropdown-content">
            <li><NavLink to= "/registerAdmin">Администратор</NavLink></li>
            <li><NavLink to= "/registerUser">Пациент</NavLink></li>
        </ul>

        <nav>
            <div className="nav-wrapper card blue-grey darken-1">
            <ul >
                    <li><a href="esc" onClick = {logoutHandler}>Выйти</a></li>
                    <li><NavLink to= "/"><i className="large material-icons">refresh</i></NavLink></li>
                    <li><a href='/#'><i className="dropdown-trigger large material-icons" data-target="dropdown1">search</i></a></li>
                    <li><a href='/#'><i className="dropdown-trigger large material-icons" data-target="dropdown2">add</i></a></li>
            </ul>
                    
            </div>
        </nav>

    </div>
        )
    
    
}