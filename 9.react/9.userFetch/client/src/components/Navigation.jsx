import React from 'react'
import {Link} from "react-router-dom"
import "./Navigation.css";
function Navigation() {
  return (
    <nav>
        <ul>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            
            <li>
                <Link to={"/users"} >Users</Link>
            </li>
            <li>
                <Link to={"/userDetail"}>UserDetail</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navigation