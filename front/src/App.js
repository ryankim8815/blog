// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Projects from "./screens/Projects";
import Live from "./screens/Live";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
import Posts from "./screens/Posts";
import NavBarElements from "./components/NavBarElements";
import "./assets/main.css";

function App() {
  return (
    <Router>
      <NavBarElements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/live" element={<Live />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
