import React from 'react'
import './Input.css'

function Input({place, func}) {
  return (
    <div>
      <input type="text" className='input' placeholder={place} onChange={func}/>
    </div>
  )
}

export default Input