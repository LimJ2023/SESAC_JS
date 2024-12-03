import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";

export default function App() {
  const pageTitle = "페이지 타이틀 입니다.";

  return (
    <div className="App">
      <Header title={pageTitle} />
      <main>
        <h1>Hello, World!</h1>
        <Counter />
      </main>
      <Footer />
    </div>
  );
}
