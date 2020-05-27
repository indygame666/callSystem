import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { NotificationCard} from '../components/NotificationCard'

export const DetailPage = () => {

    const auth = useContext(AuthContext)
    const [Notification, setNotification] = useState()
    const {loading,request} = useHttp()

    const id = useParams().id

    const getData = useCallback( async () => {
        try{
          
            const data = await request(`/api/data/getNotification/${id}`,'GET',null,{ 
                Authorization: `Bearer ${auth.token}`
            })
            
            setNotification(data)

        }catch(e){
        }
      
    }, [auth.token,request, id])

    useEffect( () => {
        
        getData()
        
    }, [getData])  

    if (loading)
    {
        return (
            <Loader/>
        )
    }

    return(
        <div>
        { !loading && Notification && <NotificationCard notification= {Notification} />}
        </div>
    )

}