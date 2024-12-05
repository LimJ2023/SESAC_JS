import React from 'react'

function Input({setMessage}) {
  return (
    <div>
        <input type="text" onChange={(e)=> {
            setMessage(e.target.value);
        }}/>
    </div>
  )
}

export default Input