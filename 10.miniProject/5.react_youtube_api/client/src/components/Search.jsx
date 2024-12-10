import React, { useState } from 'react'
import axios from "axios";

function Search({setVideos}) {
    const [query,setQuery] = useState("");

    async function handleSumbit(e) {
        e.preventDefault();
        const response = await axios.get("http://localhost:3000/search",{params: {
            q: query
        }})
        console.log(response.data);
        const videos = response.data;
        setVideos(videos);
    }
  return (
    <div>
        <form onSubmit={ (e) => {
            handleSumbit(e);
        }}>
            <div className="input-box">
                <input type="text" onChange={ (e)=> {
                    setQuery(e.target.value)
                    }}/>
                <button type="submit">검색</button>
            </div>
        </form>
    </div>
  )
}

export default Search