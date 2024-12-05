import React from 'react'
import { useParams } from 'react-router-dom'

function UserDetail() {
    const {id} = useParams();
    const users = [
        {
            id: 1, name: "Alice", email: "alice@example.com", age: 20
        },
        {
            id: 2, name: "Bob", email: "bob@example.com", age: 30
        },
        {
            id: 3, name: "Charlie", email: "charlie@example.com", age: 40
        },
    ]
    const user = users.find((u) => u.id === parseInt(id));
  return (
    <div>
        <h2>User Detail</h2>
        <p>유저 상세 페이지 : {user.id}</p>
        <p>이름: {user.name}</p>
        <p>이메일 : {user.email}</p>
        <p>나이 : {user.age}</p>
    </div>
  )
}

export default UserDetail