import React from 'react'

function Results({results}) {
  return (
    <ul>
    {results ? (
      results.map((item, index) => (
        <li key={index}>
          <div>
            <p>{item.bloggername}</p>
            <a href={`${item.link}`}>
              <p>{item.title}</p>
            </a>
            <p>{item.description}</p>
            <small>post date : {item.postdate}</small>
          </div>
        </li>
      ))
    ) : (
      <li>검색 결과가 없습니다.</li>
    )}
  </ul>
  )
}

export default Results