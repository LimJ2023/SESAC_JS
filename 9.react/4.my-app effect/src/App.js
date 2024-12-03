import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);

  const loadData = async () => {
    setLoading(true);
    //강제 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const rand = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${rand}`
      );
      const data = await response.json();
      setResult(data);
      setCount(count + 1);
    } catch (error) {
      console.log(error.message);
      setResult({ error: true, message: "컨텐츠 찾을 수 없음" });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setClearing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setResult(null);
    setCount(0);
    setClearing(false);
  };

  useEffect(() => {
    // loadData();
  }, []);

  return (
    <div className="App">
      <button
        className="btn btn-primary "
        onClick={loadData}
        disabled={loading || clearing}
      >
        {loading && <span class="spinner-border spinner-border-sm"></span>}
        Load Data
        {count}
      </button>
      <button
        className="btn btn-danger "
        onClick={handleClear}
        disabled={clearing || result === null}
      >
        {clearing && <span class="spinner-border spinner-border-sm"></span>}
        clear
      </button>
      {/* {결과를 출력할 공간} */}
      {result ? (
        result.error ? (
          <h3 style={{ color: "red" }}>{result.message}</h3>
        ) : (
          <div className="alert alert-info">
            <h3>{result.body}</h3>
            <h4>{result.title}</h4>
          </div>
        )
      ) : (
        <h3 className="alert alert-info">버튼을 누르면 글이 나옵니다.</h3>
      )}
    </div>
  );
}
