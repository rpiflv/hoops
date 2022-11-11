import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";

import Teams from "./components/Teams";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import Roster from "./components/Roster";
import Favorite from "./components/Favorite";
import PlayerProfile from "./components/PlayerProfile";

function App() {


  const [teams, setTeams] = useState([])

  return (
    <>
      <div className="App">
        <NavMenu />
        <Routes >
          <Route path="/" index element={<Home />} />
          <Route path="teams">
            <Route index element={<Teams teams={teams} setTeams={setTeams} />} />
            <Route path=":teamId" element={<Roster />} />
          </Route>
          <Route path="myplayers" >
            <Route index element={<Favorite />} />
            <Route path=":playerId" element={<PlayerProfile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
