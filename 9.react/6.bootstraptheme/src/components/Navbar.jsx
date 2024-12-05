import React, { useContext, useEffect } from 'react'
import ThemeController2 from './ThemeController2'
import {useTheme} from './ThemeContext'

function Navbar() {

  const {isDarkMode, toggleTheme} = useTheme();
  let themeMode = isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light";

  
  return (
    <nav className={`navbar navbar-expand ${themeMode} mb-4`} id="nav">
    <div className="collapse navbar-collapse" id="navBarNav">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <a className="nav-link active" href="#">User</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Order</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Item</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Store</a>
            </li>
            <li>
                {/* <ThemeController2 mode={mode} setMode={setMode}/> */}
                <button onClick={toggleTheme}>스위치</button>
            </li>
        </ul>
    </div>
</nav>
  )
}

export default Navbar