import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks';
import { NotificationList } from '../components/NotificationList.js'
import useSound from 'use-sound'
import notifySound from '../sounds/notify.mp3'
import addNotification from 'react-push-notification';

export const AdminPage = () => {

  var currentdata = null

  const [notification, setNotification] = useState(null)  

  const auth = useContext(AuthContext)
  const {request,loading} = useHttp()
  const [sound] = useSound(notifySound)

  async function subscribe() {
    let sw = await navigator.serviceWorker.ready
    console.log(sw)

  }
  
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

  subscribe()
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
 /* addNotification({
    title: 'Warning',
    subtitle: 'This is a subtitle',
    message: 'This is a very long message',
    theme: 'darkblue'
});
*/

  sound()
}

  return(
      <div>
    { notification && <NotificationList notifications = {currentdata} />}
      </div>
  )


}