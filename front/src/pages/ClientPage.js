import React, { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'
import { CardPage } from '../components/CardPage'
import { useMessage } from '../hooks/message.hooks'
import {Loader} from '../components/Loader'


export const ClientPage = () => {
    const [user,setUser] = useState(null)  
    const message = useMessage()
    
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp() 

    const notificationHandler = async() =>{
        try{
          const response = await request('api/data/generate', 'POST', {user} , { Authorization: `Bearer ${auth.token}`}) 
          message(response.message)
          
        } catch(e) {

        }
    } 

    const getUser = useCallback( async () => {
        try{
          const data = await request(`/api/data/getData/${auth.userId}`,'GET',null,{ 
                Authorization: `Bearer ${auth.token}`
            })

            setUser(data)
        }catch(e){
        }
      
    }, [auth.token,auth.userId, request])

    useEffect( () => {
        if (auth != null)
        {
        getUser()
        }
    }, [auth,getUser])  
    
    if (loading)
    {
        return <Loader/>
    }
    

    return(
        <div>
        { !loading && user && <CardPage user= {user} />}
        <button className="waves-effect waves-light btn"
        disabled = {loading}
        onClick={notificationHandler}
        >
        Запросить помощь
        </button> 
        </div>
    )

}