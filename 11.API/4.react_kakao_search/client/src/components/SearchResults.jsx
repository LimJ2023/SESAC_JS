import React from 'react'
import WebResult from './WebResult'
import ImageResult from './ImageResult'

function SearchResults({results, searchType}) {
    
    
    console.log("받아온 결과값 : ", results, "검색타입 : ", searchType);
  return (
    <div>
        <ul>
            {results ? results.map((result, index) => (
                <li  key={index}>
                {searchType === "web" && (
                    <WebResult {...result}/>
                )}
                {searchType === "image" && (
                    <ImageResult {...result}/>
                )}
                {searchType === "video" && (
                    <ImageResult {...result}/>
                )}
                </li>
            )) : (
                <li>검색 결과가 없습니다.</li>
            )}
            
        </ul>
    </div>
  )
}

export default SearchResults