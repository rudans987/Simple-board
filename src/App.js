import React from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add" element={<Detail />}></Route>
      <Route path="/detail/:id" element={<Detail />}></Route>
      <Route path="/update/:id" element={<Detail />}></Route>
    </Routes>
  );
}

export default App;
