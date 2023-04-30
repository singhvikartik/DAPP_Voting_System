import React from 'react'
import './Button.css'

function Button({func}) {
  return (
    <div className='main'>
      <button onClick={func}>Submit</button>
    </div>
  )
}

export default Button