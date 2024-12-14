import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';

function WebSearch() {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);


    const handleSearch = async ({type,input}, page = 1) => {
        setSearchType(type);
        setCurrentPage(page);
        const response = await fetch(`http://localhost:3000/webSearch?q=${input}&p=${page}&type=${type}`);
        const data = await response.json();
        setResults(data.documents);
        setTotalCount(data.meta.total_count);
    };

    const handlePageChange = (pageNumber) => {
        handleSearch({type: searchType, input: localStorage.getItem("lastQuery")}, pageNumber);
    };

    return (
        <div>
            <h1 className='text-3xl font-bold underline text-center border-1 border-gray-300 rounded-md p-2 bg-green-300'>Kooooogle 검색</h1>
            <SearchBar handleSearch={handleSearch}/>
            <SearchResults results={results} searchType={searchType}/>
            <Pagination 
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={10}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default WebSearch