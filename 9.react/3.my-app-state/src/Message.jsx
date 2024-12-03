import "./Message.css"
import React from 'react'


function Message({count, message}) {
  return (
    <div className="message">
        <p>현재 카운트는 : {count} 입니다. 입력메세지는 : {message}</p>
        {count >= 10 && <p>10번 넘게 클릭하였습니다.</p>}
    </div>
  )
}

export default Message