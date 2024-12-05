import "./App.css";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { ThemeSelector } from "./components/ThemeContext";

export default function App() {
  return (
    <div className="App">
      <ThemeSelector>
        <Navbar />
        <Table />
        <Pagination />
      </ThemeSelector>
    </div>
  );
}
