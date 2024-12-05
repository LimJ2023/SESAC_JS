import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";

export default function App() {
  return (
    <Router>
      <div className="App">나의 앱</div>
      <Routes>
        <Route path="/" element={<Navigate to={"/users"} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}
