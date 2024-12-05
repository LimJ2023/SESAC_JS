import React from 'react'
import { useTheme } from './ThemeContext';

function Pagination() {
  const {isDarkMode, toggleTheme} = useTheme();
  let themeMode = isDarkMode ? "bg-dark" : "bg-light";
  let textMode = isDarkMode ? "text-light bg-dark" : "text-dark bg-light"
  return (
    <nav aria-label="Page navigation example">
            <ul className={`pagination justify-content-center ${themeMode}`}>
                <li className="page-item"><a className={`page-link ${textMode}`} href="#">&laquo;</a></li>
                <li className="page-item"><a className={`page-link ${textMode}`} href="#">1</a></li>
                <li className="page-item"><a className={`page-link ${textMode}`} href="#">2</a></li>
                <li className="page-item"><a className={`page-link ${textMode}`} href="#">3</a></li>
                <li className="page-item"><a className={`page-link ${textMode}`} href="#">&raquo;</a></li>
            </ul>
        </nav>
  )
}

export default Pagination