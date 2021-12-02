import React from 'react'

export default function Modal(props) {

  

  return (
    <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.pokemon.name}</h4>
        </div>
        <div className="modal-body">
          <span className="modal-body--poke-id">{props.pokemon.id}</span>
          <img className="modal-body--poke-img" src={props.pokemon.imageUrl} alt={props.pokemon.name}/>
        </div>
          <div className="modal-info-box">
            <div className="info-box-height-weight">
              <p>Height: {props.pokemon.height / 10} {props.pokemon.height / 10 === 1 ? 'meter' : 'meters'}</p>
              <p>Weight: {props.pokemon.weight / 10} {props.pokemon.weight === 1 ? 'kilogram' : 'kilograms'}</p>
            </div>
            <div>
              <ul className="types-colors">
                {props.pokemon.types.map((type, index) => (
                  <li key={index}>
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="modal-close-btn">Close</button>
        </div>
      </div>
    </div>
  )
}