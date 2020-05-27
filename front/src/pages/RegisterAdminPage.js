import React, {useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../css/buttons.css'
import '../css/cards.css'

export const RegisterAdminPage = () => {
    const message = useMessage()
    const history = useHistory()
    const auth = useContext(AuthContext)

    const {loading,request,error, clearError} = useHttp()
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

    

    const registerHandler = async() =>{
        try{

            const data = await request('api/admin/registerAdmin', 'POST', {...form}, { 
              Authorization: `Bearer ${auth.token}`})
            message(data.message)
            history.push('/')
        } catch(e) {

        }
    } 

 const handleClick = () => {
      history.push('/adminPage')
  }
 

    return(
    <div>
                            <span className="card-title">Регистрация</span>
                            <div >

                            <div className="input-field">
                            <input 
                            placeholder="Введите логин" 
                            id="login" 
                            type="text"
                            name="login"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="login"></label>
                          </div>

                          <div className="input-field">
                            <input 
                            placeholder="Придумайте пароль" 
                            id="password" 
                            type="password"
                            name="password"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="password"></label>
                          </div>

                            </div>
                                <div className="card-action">

                                <button className="main btn waves-effect waves-light"
                                disabled = {loading}
                                onClick = {registerHandler}
                                >
                                Зарегистрироваться
                                </button>
                              
                                <button className="secondary btn waves-effect waves-light "
                                disabled = {loading}
                                onClick = {handleClick}
                                >
                                Выйти
                                </button>            
                                
                            </div>
      </div>
                   
                
            
    )

}