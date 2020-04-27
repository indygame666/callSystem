import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useMessage } from '../hooks/message.hooks';
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks';
import { NotificationList } from '../components/NotificationList.js'
import {Loader} from '../components/Loader'

export const AdminPage = () => {

  const [notification, setNotification] = useState(null)  
  const message = useMessage()
  
  const auth = useContext(AuthContext)
  const {loading, request} = useHttp() 

  const getNofitication = useCallback( async () => {
    try{

      const data = await request(`/api/admin/getNotifications`,'GET',null,{ 
            Authorization: `Bearer ${auth.token}`
        })

        setNotification(data)

    }catch(e){
    }
  
}, [auth.token,request])


/*const getUpdate = useCallback( async () => {
  try{
    const data = await request(`/api/admin/update`,'GET',null,{ 
          Authorization: `Bearer ${auth.token}`
      })

      setNotification(data)

  }catch(e){
  }

}, [auth.token,request]) */


useEffect( () => {

  getNofitication()

  const interval = setInterval(getNofitication,3000)

  return () => clearInterval(interval)

}, [getNofitication])  

/*
if (loading)
    {
        return <Loader/>
    }
*/

  return(
    <div>
    { notification && <NotificationList notifications = {notification} />}
    </div>
  )
}