import React, { useEffect } from 'react'

function Message({message, count}) {
    
    // 리액트 컴포넌트 라이프 사이클을 공부해보기.
    useEffect(() => {
        document.title = message || "기본1 타이틀";
    },[message])

useEffect(() => {
        document.title = message || "기본2 타이틀";
    },[])
  return (
    <div>
        <h4>메세지 : {message}</h4>
        
        {count > 10 && (<p>많이 클릭 하셨네요.</p>)}

        <h4>카운트 : {count}</h4>
    </div>
  )
}

export default Message