import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hooks'


export const AuthPage = () => {
    const message = useMessage()

    const {loading,request,error,clearError} = useHttp()
    const [form,setForm] = useState({
        wardNumber:'', password: '' 
    })

    const changeHandler = event => {
    setForm({...form,[event.target.name]: event.target.value})
    }

    useEffect(() =>{
    message(error)
    clearError()
    },[error,message,clearError])



    const loginHandler = async() =>{
        try{
            const data = await request('api/auth/login', 'POST', {...form})
            message(data.message)
        } catch(e) {

        }
    } 
 

    return(
        <div className="row">
            <div className = "col s6 offset-s3">
                <h1>Auth Page</h1>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>

                            <div className="input-field">
                            <input 
                            placeholder="Введите номер палаты + номер койки" 
                            id="wardNumber" 
                            type="text"
                            name="wardNumber"
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
                            </div>
                                <div className="card-action">
                                
                                <button className="waves-effect waves-light btn"
                                 style={{marginRight: 10}}
                                 onClick={loginHandler}
                                 disabled = {loading}
                                 >
                                 Войти
                                 </button>

                                <button className="waves-effect waves-light btn"
                                disabled = {loading}
                                >
                                Зарегистрироваться
                                </button>                                
                                </div>
                    </div>
                </div>
            </div>
    )

}