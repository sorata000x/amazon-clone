import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Checkout from "./Checkout";

function App() {
return (
  <div className="app">
    <Router>
      <Header />
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </div>
);
}
export default App;
