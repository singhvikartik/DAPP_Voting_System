import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCandidates from "./pages/CreateCandidates";
import CreateVoters from "./pages/CreateVoters";
import CheckWinnerPage from "./pages/CheckWinnerPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/createCandidate" element={<CreateCandidates /> }/>
        <Route path="/createVoters" element={<CreateVoters />}/>
        <Route path="/checkWinner" element={<CheckWinnerPage />} />
      
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
