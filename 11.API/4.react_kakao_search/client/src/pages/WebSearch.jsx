import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults';

function WebSearch() {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("");


    const handleSearch = async ({type,input}) => {
        setSearchType(type);
        const page = localStorage.getItem("page") || localStorage.setItem("page", 1);
        const query = input;
        const response = await fetch(`http://localhost:3000/webSearch?q=${query}&p=${page}&type=${type}`);
        const data = await response.json();
        console.log("data : ", data);
        setResults(data.documents);
    };

  return (
    <div>
        <h1 className='text-3xl font-bold underline'>Kooooogle 검색</h1>
        <SearchBar handleSearch={handleSearch}/>
        <SearchResults results={results} searchType={searchType}/>
    </div>
  )
}

export default WebSearch