import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import authService from "./services/auth.service";

import Teams from "./components/Teams";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import Roster from "./components/Roster";
import Favorite from "./components/Favorite";
import PlayerProfile from "./components/PlayerProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  const [user, setUser] = useState(undefined)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user)
    }
  }, [])



  return (
    <>
      <div className="App">
        <NavMenu user={user} />
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
