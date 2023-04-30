import React, { useState, useEffect } from "react";
import { connectWallet, walletConnection } from "../../Api/api";

import "./Navbar.css";

function Navbar({ acc }) {
  return (
    <div>
      <nav>
        <a style={{ textDecoration: "none", color: "black" }} href="/">
          <h1>Election Dapp</h1>
        </a>
        <a
          style={{ textDecoration: "none", color: "black" }}
          href="/createCandidate"
        >
          <h4>Create Candidate</h4>
        </a>
        <a
          style={{ textDecoration: "none", color: "black" }}
          href="/createVoters"
        >
          <h4>Create Voters</h4>
        </a>
        <a
          style={{ textDecoration: "none", color: "black" }}
          href="/checkWinner"
        >
          <h4>Check Winner</h4>
        </a>

        <h2>
          Account: {acc.slice(0, 5)}...{acc.slice(-4)}
        </h2>
      </nav>
    </div>
  );
}

export default Navbar;
