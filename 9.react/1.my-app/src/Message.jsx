import "./Message.css"
import React from 'react'


function Message({count}) {
  return (
    <div className="message">
        <p>현재 카운트는 : {count} 입니다.</p>
    </div>
  )
}

export default Message