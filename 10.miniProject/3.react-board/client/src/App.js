import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TablePage from "./components/TablePage";
import PostPage from "./components/PostPage";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TablePage />}></Route>
          <Route path="/post" element={<PostPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
