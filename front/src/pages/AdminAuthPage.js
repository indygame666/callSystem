import React, { useState, useEffect } from 'react'
import { useMessage } from '../hooks/message.hooks'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'

export const AdminAuthPage = () => {
    
    const message = useMessage()
    const history = useHistory()

    const {error,clearError} = useHttp()

    const [form,setForm] = useState({
        login:'', password: '' 
    })

    const changeHandler = event => {
    setForm({...form,[event.target.name]: event.target.value})
    }
    
    useEffect(() =>{
      message(error)
      clearError()
      },[error,message,clearError])

    return(
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
         
        <div className="input-field">
        <input 
        placeholder="введите имя пользователя" 
        id="login" 
        type="text"
        name="login"
        onChange = {changeHandler}
        />
        <label htmlFor="id"></label>
      </div>

      <div className="input-field">
        <input 
        placeholder="Введите пароль" 
        id="password" 
        type="password"
        name="password"
        onChange = {changeHandler}
        />
        <label htmlFor="password"></label>
      </div>

        </div>
        <div class="card-action">

        <button className="waves-effect waves-light btn"
        style={{marginRight: 10}}
        >
        Войти
        </button>

        </div>
      </div>
    </div>
    )
}