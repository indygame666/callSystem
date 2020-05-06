import React, {useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const RegisterPage = () => {
    const message = useMessage()
    const history = useHistory()
    const auth = useContext(AuthContext)

    const {loading,request,error, clearError} = useHttp()
    const [form,setForm] = useState({
       fullName:'', password: '', wardNumber: '', gender: '', diagnoses: '', treatment:''
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

            const data = await request('api/admin/register', 'POST', {...form}, { 
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
        <div className="row">
            <div className = "col s6 offset-s3">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Регистрация</span>
                            <div>

                            <div className="input-field">
                            <input 
                            placeholder="Введите ФИО" 
                            id="fullName" 
                            type="text"
                            name="fullName"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="fullName"></label>
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
                          placeholder="Введите пол (М/Ж)" 
                          id="gender" 
                          type="text"
                          name="gender"
                          onChange = {changeHandler}
                          />
                          <label htmlFor="gender"></label>
                        </div>
                         
                        <div className="input-field">
                            <input 
                            placeholder="Впишите предварительный диагноз" 
                            id="diagnoses" 
                            type="text"
                            name="diagnoses"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="diagnoses"></label>
                          </div>
                          
                        <div className="input-field">
                            <input 
                            placeholder="Впишите рекомендуемое лечение(необязательно)" 
                            id="treatment" 
                            type="text"
                            name="treatment"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="treatment"></label>
                         </div>

                            </div>
                            </div>
                                <div className="card-action">

                                <button className="waves-effect waves-light btn"
                                disabled = {loading}
                                onClick = {registerHandler}
                                >
                                Зарегистрироваться
                                </button>
                                
                                <button className="waves-effect waves-light btn"
                                disabled = {loading}
                                onClick = {handleClick}
                                >
                                Выйти
                                </button>            
                                
                                </div>
                    </div>
                </div>
            </div>
    )

}