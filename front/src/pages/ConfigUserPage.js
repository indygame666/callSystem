import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'
import { Loader } from '../components/Loader'
import { EditUserField } from '../components/EditUserField'

export const ConfigUserPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [client, setClient] = useState(null)  


    const [form,setForm] = useState({
        wardNumber:''
     })
 
     const changeHandler = event => {
     setForm({...form,[event.target.name]: event.target.value})
    }

    const findHandler = async() =>{
        try{

            const data = await request(`/api/data/getClient/${form.wardNumber}`,'GET',null,{ 
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
        { !loading && <EditUserField  user = {client} />}
        </div>
        )
    }
    else{
    return (
        <div>
        
            <div className="input-field">
                <input 
                placeholder="Введите номер палаты" 
                id="wardNumber" 
                type="text"
                name="wardNumber"
                onChange = {changeHandler}

            />
            <label htmlFor="wardNumber"></label>
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