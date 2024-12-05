import React, { useEffect } from 'react'

function Count({count, setCount}) {
    
    useEffect(() => {
            console.log("카운트 변수 변경됨", count);
        // Cleanup 함수라고 부르는 변화가 발생했을 시 선행해서 실행할함수
        return () => {
            // 클린업 함수에선 count값이 바뀌지 않았다. 순서의 문제가있나?
            // 선행해서 실행해주는 함수
            console.log("클린업함수 진입 카운트 : ", count);
        }
    },[count])
  return (
    <div>
        <button onClick={ ()=> {
            setCount(count + 1);
        }}>카운트 더하기</button>
        <button onClick={ ()=> {
            setCount(count - 1);
        }}>카운트 빼기</button>
        <h3>{count}</h3>
    </div>
  )
}

export default Count