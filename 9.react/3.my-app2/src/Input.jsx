import React from 'react'

function Input({setMessage}) {
  return (
    <div>
        <label htmlFor="">메세지 입력 : </label>
        <input type="text" placeholder='메세지를 입력하세요.'
        onChange={(e) => setMessage(e.target.value)}/>
    </div>
  )
}

export default Input