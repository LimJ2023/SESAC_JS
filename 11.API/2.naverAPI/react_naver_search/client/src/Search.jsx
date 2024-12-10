import React, { useState } from 'react'

function Search({setResults}) {
    const [query, setQuery] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/search/blog?query=${query}`);
        const data = await response.json();
        console.log(data);
        setResults(data.items);
    }
  return (
    <form onSubmit={(e)=> {
        handleSearch(e)
    }}>
        <input type="text" name="query" onChange={(e)=> {
            setQuery(e.target.value);
        }} />
        <button type="submit">검색</button>
    </form>
  )
}

export default Search