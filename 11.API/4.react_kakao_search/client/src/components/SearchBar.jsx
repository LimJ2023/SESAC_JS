import React, { useState } from 'react'

function SearchBar({handleSearch}) {
    const [input,setInput] = useState("");
  return (
    <div className='flex flex-row gap-2 mt-2 ml-2'>
        <input type="text" onChange={(e) => {
            setInput(e.target.value)
        }} className='border-2 border-gray-300 rounded-md p-2'/>
        <button onClick={() => { handleSearch({type: "web",input: input})}} className='border-2 border-gray-300 rounded-md p-2'>웹검색</button>
        <button onClick={() => { handleSearch({type: "image",input: input})}} className='border-2 border-gray-300 rounded-md p-2'>이미지검색</button>
        <button onClick={() => { handleSearch({type: "video",input: input})}} className='border-2 border-gray-300 rounded-md p-2'>영상검색</button>
    </div>
  )
}

export default SearchBar