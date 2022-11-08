import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";

import Teams from "./components/Teams";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";

function App() {

  const [teams, setTeams] = useState([])

  return (
    <>
      <div className="App">
        <NavMenu />
        <Routes >
          <Route path="/" index element={<Home />} />
          <Route path="teams" element={<Teams teams={teams} setTeams={setTeams} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
