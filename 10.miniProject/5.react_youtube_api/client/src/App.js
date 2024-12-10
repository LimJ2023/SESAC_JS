import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import VideoList from "./components/VideoList";
import YoutubePlayer from "./components/YoutubePlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  const [videos, setVideos] = useState([]);
  return (
    <div className="App">
      <Search setVideos={setVideos} />
      <Router>
        <Routes>
          <Route path="/" element={<VideoList videos={videos} />}></Route>
          <Route path="/play" element={<YoutubePlayer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

