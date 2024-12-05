import React from 'react'
import { useParams } from 'react-router-dom'

function UserDetail() {
    const {id} = useParams();
    const users = [
        {
            id: 1, name: "Alice"
        },
        {
            id: 2, name: "Bob"
        },
        {
            id: 3, name: "Charlie"
        },
    ]
    const user = users.find((u) => u.id === parseInt(id));
  return (
    <div>
        <h2>User Detail</h2>
        <p>유저 상세 페이지 : {user.id}</p>
        <p>이름: {user.name}</p>
    </div>
  )
}

export default UserDetail