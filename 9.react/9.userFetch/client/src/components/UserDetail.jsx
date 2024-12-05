import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserDetail() {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${id}`);
            
            const data = await response.json();
            if(data.error) {
                throw new Error(data.message)
            }
            setUser(data);
        } catch (error) {
            console.log("에러발생 : ", error.message);
        }
    }
    useEffect(() => {
        fetchUser();
    },[])
  return (
    
      <div>
        {user ? (
            <div>
            <h2>User Detail</h2>
            <p>유저 상세 페이지 : {user.id}</p>
            <p>이름: {user.name}</p>
            <p>이메일 : {user.email}</p>
            <p>나이 : {user.age}</p>
            </div>
        ) :
        (<div>
            <p>유저를 찾을 수 없습니다.</p>    
        </div>)
        }
        
    </div>
  )
}

export default UserDetail