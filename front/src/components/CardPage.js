import React from 'react'

export const CardPage = ( {user} ) =>{
    const name = user[Object.keys(user)[1]]
    const wardNumber = user[Object.keys(user)[3]]
    const gender = user[Object.keys(user)[4]]
    const diagnoses = user[Object.keys(user)[5]]


 return(
    <div className="collection">
    <ul className="collection with-header">
        <li className="collection-header"><h4>Имя:</h4></li>
        <li className="collection-item">{name}</li>
        <li className="collection-header"><h4>Номер Палаты:</h4></li>
        <li className="collection-item">{wardNumber}</li>
        <li className="collection-header"><h4>Пол:</h4></li>
        <li className="collection-item">{gender}</li>
        <li className="collection-header"><h4>Диагноз:</h4></li>
        <li className="collection-item">{diagnoses}</li>
        
    </ul>
</div>
 )


}