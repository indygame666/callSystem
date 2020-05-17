import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hooks'

export const EditAdminField = ( { user } ) => {

    const {loading,request} = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()

    const id = user[Object.keys(user)[0]]
    const login = user[Object.keys(user)[1]]


    const [form,setForm] = useState({
       id: id, login: login
     })
 
     const changeHandler = event => {
     setForm({...form,[event.target.name]: event.target.value})
     }

     const changeClick = async() =>{
        try{

            const data = await request(`api/data/updateAdmin`, 'PUT', {...form}, { 
              Authorization: `Bearer ${auth.token}`})

            message(data.message)
            history.push('/')
        } catch(e) {

        }
    }

     const deleteClick = async() => {
        try{

            
            const response = await request(`api/data/deleteAdmin`, 'POST', {...form}, { 
                Authorization: `Bearer ${auth.token}`})
                message(response.message)
                history.push('/')

        } catch(e){

        }

    }

    return (
        <div>

               <div className="input-field">
                            <input
                            placeholder="id"
                            id="id"                         
                            type="text"
                            name="id"
                            value = {id}
                            onChange = {changeHandler}
                            />
                            <label htmlFor="id"></label>
            </div>


            <div className="input-field">
                            <input
                            placeholder="логин"
                            id="login"                         
                            type="text"
                            name="login"
                            value = {form.login}
                            onChange = {changeHandler}
                            />
                            <label htmlFor="login"></label>
            </div>

            <button className="waves-effect waves-light main btn"
                                disabled = {loading}
                                onClick = {changeClick}
                                >
                                Изменить
                                </button>

            <button className="waves-effect red secondary btn"
                                disabled = {loading}
                                onClick = {deleteClick}
                                >
                                удалить
                                </button>  

                                

        </div>
    )

}