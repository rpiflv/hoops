import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import authService from "./services/auth.service";
import Teams from "./components/Teams";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import PlayerProfile from "./components/PlayerProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Games from "./components/Games";
import Game from "./components/Game";
import AlertModalNoData from "./components/AlertModalNoData";
import Team from "./components/Team";
import Sidebar from "./components/Sidebar";

function App() {

  const [user, setUser] = useState(undefined);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <div className="App">
        <header>
        <NavMenu user={user} />
        </header>
        <div className="content">
        <aside>
          <Sidebar/>
        </aside>
      {/* <AlertModalNoData/> */}
        <Routes >
          <Route path="/" index element={<Home />} />
          <Route path="/:playerId" index element={<PlayerProfile />} />

          <Route path="teams">
            <Route index element={<Teams teams={teams} setTeams={setTeams} />} />
            <Route path=":teamId" element={<Team />} />
          </Route>
          <Route path="games">
            <Route index element={<Games games={games} setGames={setGames} />} />
            <Route path=":gameId" element={<Game />} />
          </Route>
          <Route path="myplayers" >
            <Route index element={<Favorite />} />
            <Route path=":playerId" element={<PlayerProfile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        <aside>
          <Sidebar className="sidebar"/>
        </aside>
        </div>
      </div>
    </>
  );
}

export default App;
