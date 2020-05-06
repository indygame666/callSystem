import React, { useState, useEffect, useContext } from 'react'
import { useMessage } from '../hooks/message.hooks'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'

export const AdminAuthPage = () => {
    
    const message = useMessage()
    const auth = useContext(AuthContext)

   const {loading,request,error,clearError} = useHttp()

    const [form,setForm] = useState({
        login:'', password: '' 
    })

    const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
    }

   const loginHandler = async() =>{
      try{
        const user = await request('api/admin/login', 'POST', {...form})

        const temp = user.token

        const data = await request('api/data/verify','POST', {temp} )

        auth.login(user.token, user.userId, data.user)
      } catch(e) {

      }
  }
   
    
    useEffect(() =>{
      message(error)
      clearError()
      },[error,message,clearError])

    return(
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
         
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
        <div className="card-action">

        <button className="waves-effect waves-light btn"
        style={{marginRight: 10}}
        onClick = {loginHandler}
        disabled = {loading}
        >
        Войти
        </button>

        </div>
      </div>
    </div>
    )
} 
