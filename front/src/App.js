// import logo from "./logo.svg";
// import "./App.css";
import "./assets/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Projects from "./screens/Projects";
import Live from "./screens/Live";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
import Posts from "./screens/Posts";
import NavBarElements from "./components/NavBarElements";

function App() {
  return (
    <Router>
      <NavBarElements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Live" element={<Live />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
