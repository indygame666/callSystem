import React from 'react'

export const CardPage = ( {user} ) => {
    const name = user[Object.keys(user)[1]]
    const wardNumber = user[Object.keys(user)[3]]
    const gender = user[Object.keys(user)[4]]
    const diagnoses = user[Object.keys(user)[5]]
    const treatment = user[Object.keys(user)[6]]


/* return(    
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
 )


}
*/

return(
    <div>

    <ul className="collection">

    <li className="collection-item avatar">
      <i className="material-icons circle blue-grey darken-1">person</i>
      <span className="title">Имя:</span>
      <p className = 'flow-text'> {name}</p>
    </li>

    <li className="collection-item avatar">
      <i className="material-icons circle blue-grey darken-1">airline_seat_individual_suite</i>
      <span className="title">Номер палаты:</span>
      <p  className = 'flow-text'> {wardNumber}</p>
    </li>

    <li className="collection-item avatar">
      <i className="material-icons circle blue-grey darken-1">wc</i>
      <span className="title">Пол:</span>
      <p  className = 'flow-text'> {gender}</p>
    </li>

    <li className="collection-item avatar">
      <i className="material-icons circle blue-grey darken-1">announcement</i>
      <span className="title">Диагноз:</span>
      <p  className = 'flow-text'> {diagnoses}</p>
    </li>

    <li className="collection-item avatar">
      <i className="material-icons circle blue-grey darken-1">local_hospital</i>
      <span className="title">Лечение:</span>
      <p  className = 'flow-text'> {treatment}</p>
    </li>

    </ul>
    
    </div>
)
}