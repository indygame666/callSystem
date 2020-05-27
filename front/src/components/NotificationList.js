import React, { useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'
import '../css/scroll.css'
import { useHistory, Link } from 'react-router-dom'

export const NotificationList = ( { notifications } ) => {
    
    const {loading, request} = useHttp() 
    const auth = useContext(AuthContext)
    const history = useHistory() 

    const deleteHandler = async( notification ) =>{
        try{
         
          await request('/api/admin/deleteNotification', 'POST', { notification } , { Authorization: `Bearer ${auth.token}`})
                    
          window.location.reload()
        } catch(e) {

        }
    } 

    if (!notifications.length){

    return <p className ="centered">Нет запросов на помощь</p>
    }

    return(

        <table className ="centered">
        <thead>
          <tr>
              <th>ФИО</th>
              <th>Палата</th>
          </tr>
        </thead>

        <tbody>
        { notifications.map( (notification) =>{
            return(
            <tr key = {notification._id}>
                <td><Link to ={`/detail/${notification._id}`}>{notification.name}</Link></td>
                <td>{notification.wardNumber}</td>
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