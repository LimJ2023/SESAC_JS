import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Users() {
    
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/users");
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
                console.log(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    },[])

  return (
    <div>
        <h2>유저 목록</h2>
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>
    </div>

  )
}

export default Users