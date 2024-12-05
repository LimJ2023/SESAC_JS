import React from 'react'
import { useTheme } from './ThemeContext';

function Table() {
  const {isDarkMode, toggleTheme} = useTheme();
  let themeMode = isDarkMode ? "table-dark bg-dark" : "table-light bg-light";
  
  return (
    <div className="container container-fluid">
    <table className={`table table-striped table-hover ${themeMode} `} id="table">
            <thead>
                <tr>
                    <th>컬럼 1</th>
                    <th>컬럼 2</th>
                    <th>컬럼 3</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                <tr>
                    <td>데이터 1</td>
                    <td>데이터 2</td>
                    <td>데이터 3</td>
                </tr>
                <tr>
                    <td>데이터 4</td>
                    <td>데이터 5</td>
                    <td>데이터 6</td>
                </tr>
                <tr>
                    <td>데이터 7</td>
                    <td>데이터 8</td>
                    <td>데이터 9</td>
                </tr>
            </tbody>
        </table>
        </div>
  )
}

export default Table