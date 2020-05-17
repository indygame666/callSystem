import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'
import { Loader } from '../components/Loader'
import { EditAdminField } from '../components/EditAdminField'

export const ConfigAdminPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [client, setClient] = useState(null)  


    const [form,setForm] = useState({
        login:''
     })
 
     const changeHandler = event => {
     setForm({...form,[event.target.name]: event.target.value})
    }

    const findHandler = async() =>{
        try{

            const data = await request(`/api/data/getAdmin`,'POST',{...form},{ 
                Authorization: `Bearer ${auth.token}`})
            
            setClient(data)

        } catch(e) {

        }
    } 

    if (loading)
    {
        return <Loader/>

    }

    if (client)
    {
        return(
            <div>
            { !loading && <EditAdminField  user = {client} />}
            </div>
        )
    }
    else{
    return (
        <div>
        
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

        <button className="waves-effect waves-light btn"
        disabled = {loading}
        onClick = {findHandler}
        >
        Найти
        </button>


        </div>
        )
    }
}