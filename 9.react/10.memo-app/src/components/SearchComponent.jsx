import React, { useState } from 'react'

function SearchComponent({searching}) {
  const [input, setInput] = useState("");
  return (
    <div className='d-grid'>
        <input type="text" placeholder='검색어를 입력하세요'
        className='search-bar'
        onChange={(e) => {
          setInput(e.target.value);
        }}/>
        <button onClick={() => {
          searching(input);
        }}>검색</button>
    </div>
  )
}

export default SearchComponent