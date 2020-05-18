import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hooks'

export const EditUserField = ( { user } ) => {

    const {loading,request} = useHttp()
    const  history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()

    const id = user[Object.keys(user)[0]]
    const name = user[Object.keys(user)[1]]
    const wardNumber = user[Object.keys(user)[3]]
    const gender = user[Object.keys(user)[4]]
    const diagnoses = user[Object.keys(user)[5]]
    const treatment = user[Object.keys(user)[6]]


    const [form,setForm] = useState({
        fullName: name , wardNumber: wardNumber, gender: gender, diagnoses: diagnoses, treatment: treatment,
     })
 
     const changeHandler = event => {
     setForm({...form,[event.target.name]: event.target.value})
     }

     const changeClick = async() =>{
        try{

            console.log(id)

            const data = await request(`api/admin/updateUser/${form.wardNumber}`, 'PUT', {...form, id}, { 
              Authorization: `Bearer ${auth.token}`})

            message(data.message)
            history.push('/')
        } catch(e) {

        }
    }

     const deleteClick = async() => {
        try{

            
            const response = await request(`api/admin/deleteUser/${form.wardNumber}`, 'POST', {...form.wardNumber, id}, { 
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
                            placeholder=" ФИО"
                            id="fullName"                         
                            type="text"
                            name="fullName"
                            value = {form.fullName}
                            onChange = {changeHandler}
                            />
                            <label htmlFor="fullName"></label>
            </div>

            <div className="input-field">
                            <input 
                            placeholder="номер палаты" 
                            value = {form.wardNumber}
                            id="wardNumber" 
                            type="text"
                            name="wardNumber"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="wardNumber"></label>
            </div>

            <div className="input-field">
                            <input 
                            placeholder="пол М/Ж" 
                            value = {form.gender}
                            id="gender" 
                            type="text"
                            name="gender"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="gender"></label>
            </div>
            

            <div className="input-field">
                            <input 
                            placeholder="диагноз" 
                            value = {form.diagnoses}
                            id="diagnoses" 
                            type="text"
                            name="diagnoses"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="diagnoses"></label>
            </div>

            <div className="input-field">
                            <input 
                            placeholder="лечение" 
                            value = {form.treatment}
                            id="treatment" 
                            type="text"
                            name="treatment"
                            onChange = {changeHandler}
                            />
                            <label htmlFor="treatment"></label>
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