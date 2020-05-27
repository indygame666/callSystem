import React from 'react'

export const NotificationCard = ( { notification } ) => {

    const name = notification[Object.keys(notification)[1]]
    const wardNumber = notification[Object.keys(notification)[2]]
    const gender = notification[Object.keys(notification)[3]]
    const diagnoses = notification[Object.keys(notification)[4]]
    const treatment = notification[Object.keys(notification)[5]]

    return(
        <div>

        <ul className="collection with-header">
        
        <li className="collection-header"><h4>Имя:</h4></li>
            <li className="collection-item">{name}</li>
            
            <li className="collection-header"><h4>Номер Палаты:</h4></li>
            <li className="collection-item">{wardNumber}</li>
            
            <li className="collection-header"><h4>Пол:</h4></li>
            <li className="collection-item">{gender}</li>
            
            <li className="collection-header"><h4>Диагноз:</h4></li>
            <li className="collection-item">{diagnoses}</li>
    
            <li className="collection-header"><h4>Лечение:</h4></li>
            <li className="collection-item">{treatment}</li>
        
        </ul>
        
        </div>
    )

}