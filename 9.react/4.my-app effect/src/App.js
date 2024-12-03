import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  const loadData = async () => {
    const rand = Math.floor(Math.random() * 10) + 1;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${rand}`
    );
    const data = await response.json();
    setResult(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <button onClick={loadData}>Load Data</button>

      {/* {결과를 출력할 공간} */}
      {result ? (
        <div className="result">
          <h3>{result.body}</h3>
          <h4>{result.title}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
