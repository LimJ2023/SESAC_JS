import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";
import Message from "./Message";
import React, { useState } from "react";
import Input from "./Input";

export default function App() {
  const pageTitle = "페이지 타이틀 입니다.";
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      <Header title={pageTitle} />
      <main>
        <h1>Hello, World!</h1>
        <Counter count={count} setCount={setCount} />
        <Input setMessage={setMessage} />
        <Message count={count} message={message} />
        {message && <h3>{message}</h3>}
      </main>
      <Footer />
    </div>
  );
}
