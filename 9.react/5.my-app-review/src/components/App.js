import { useState } from "react";
import "./App.css";
import Count from "./Count";
import Footer from "./Footer";
import Header from "./Header";
import Input from "./Input";
import Message from "./Message";

export default function App() {
  const pageTitle = "Welcome to My Website!";
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      <Header title={pageTitle} />
      <main>
        <h1>Hello, World!</h1>
        <p>메인 글자가 쓰이는 곳</p>
        <Count count={count} setCount={setCount} />
        <Input message={message} setMessage={setMessage} />
        <Message message={message} count={count} />
      </main>
      <Footer />
    </div>
  );
}
