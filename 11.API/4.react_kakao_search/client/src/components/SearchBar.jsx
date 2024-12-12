import React, { useState } from 'react'

function SearchBar({handleSearch}) {
    const [input,setInput] = useState("");
  return (
    <div>
        <input type="text" onChange={(e) => {
            setInput(e.target.value)
        }}/>
        <button onClick={() => { handleSearch({type: "web",input: input})}}>웹검색</button>
        <button onClick={() => { handleSearch({type: "image",input: input})}}>이미지검색</button>
        <button onClick={() => { handleSearch({type: "video",input: input})}}>영상검색</button>
    </div>
  )
}

export default SearchBar