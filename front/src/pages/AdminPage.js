import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks';
import { NotificationList } from '../components/NotificationList.js'


export const AdminPage = () => {

  const [notification, setNotification] = useState(null)  

  const auth = useContext(AuthContext)
  const {request} = useHttp() 

  const getNofitication = useCallback( async () => {
    try{

      const data = await request(`/api/admin/getNotifications`,'GET',null,{ 
            Authorization: `Bearer ${auth.token}`
        })

        setNotification(data)

    }catch(e){
    }
  
}, [auth.token,request])


useEffect( () => {

  getNofitication()

  const interval = setInterval(getNofitication,3000)

  return () => clearInterval(interval)

}, [getNofitication])  


  return(
    <div>
    { notification && <NotificationList notifications = {notification} />}
    </div>
  )
}