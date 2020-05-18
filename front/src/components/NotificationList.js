import React, { useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'

export const NotificationList = ( { notifications } ) => {
    
    const {loading, request} = useHttp() 
    const auth = useContext(AuthContext)

    const deleteHandler = async( notification ) =>{
        try{
         
          await request('/api/admin/deleteNotification', 'POST', { notification } , { Authorization: `Bearer ${auth.token}`})
                    
          window.location.reload()
        } catch(e) {

        }
    } 
    
    if (!notifications.length){

    return <p className ="center">Нет запросов на помощь</p>
    }

    return(

        <table>
        <thead>
          <tr>
              <th>ФИО</th>
              <th>Палата</th>
              <th>Диагноз</th>
          </tr>
        </thead>

        <tbody>
        { notifications.map( (notification) =>{
            return(
            <tr key = {notification._id}>
                <td>{notification.name}</td>
                <td>{notification.wardNumber}</td>
                <td>{notification.diagnoses}</td>
                <td>
                <button className="waves-effect red btn"
                disabled = {loading}
                onClick={() => deleteHandler(notification.wardNumber)}
                >
                удалить
                </button> 
                </td>
            </tr>
            )
        }) }
        </tbody>
      </table>
    )
  

}