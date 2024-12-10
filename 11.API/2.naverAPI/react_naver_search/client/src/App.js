import { useState } from "react";
import "./App.css";
import Search from "./Search";

export default function App() {
  const [results, setResults] = useState(null);
  return (
    <div className="App">
      <h1>네이버 블로그 검색</h1>
      <Search setResults={setResults} />
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
    </div>
  );
}
