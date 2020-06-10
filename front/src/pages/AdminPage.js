import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks';
import { NotificationList } from '../components/NotificationList.js'
import useSound from 'use-sound'
import notifySound from '../sounds/notify.mp3'
//import addNotification from 'react-push-notification';
import { subscribeUser } from '../subscription';


export const AdminPage = () => {

  var currentdata = null

  const [notification, setNotification] = useState(null)  

  const auth = useContext(AuthContext)
  const {request,loading} = useHttp()
  const [play] = useSound(notifySound)



  const getNofitication = useCallback( async () => {
    try{

      const data = await request(`/api/data/getNotifications`,'GET',null,{ 
            Authorization: `Bearer ${auth.token}`
        })

       setNotification(data)


    }catch(e){
    }
  
}, [auth.token,request])


useEffect( () => {
  
  
 //subscribeUser()


  getNofitication()

  const interval = setInterval(getNofitication,3000)

  return () => clearInterval(interval)

}, [getNofitication])  


if (currentdata == null)
{
  currentdata = notification  
}

if (currentdata !== notification)
{
  currentdata = notification



  /*const payload = JSON.stringify({
      title: 'Hello!',
      body: 'It works.',
    })
  
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
      */

  //play()

}

  return(
      <div>
    { notification && <NotificationList notifications = {currentdata} />}
      </div>
  )


}