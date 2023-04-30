import React, { useEffect, useState } from "react";
//import router
//Internal import
import "../styles/Home.css";
// import images from "../assets/";
import Navbar from "../components/Navbar/Navbar";
import CardComp from "../components/Card/Card";
import {
  candidateLen,
  connectWallet,
  getAllCandidateAddress,
  giveVote,
  voterLen,
  winner,
} from "../Api/api";

function Home() {
  const [account, setAccount] = useState("");
  const [candidateCount, setcandidateCount] = useState("");
  const [voterCount, setVoterCount] = useState("");
  const [candidate, setCandidate] = useState([]);
  useEffect(() => {
    async function wallet() {
      const { account } = await connectWallet();
      setAccount(account[0]);
    }
    wallet();
    window.ethereum.on("accountsChanged", function (account) {
      console.log(account[0]);
      setAccount(account[0]);
    });
    lenOfCandidate();
    lenOfVoter();
    allCandidates();
  }, []);

  // --------Function--------

  //get Candidate length
  const lenOfCandidate = async () => {
    const data = await candidateLen();
    setcandidateCount(data);
  };
  //get Voter length
  const lenOfVoter = async () => {
    const data = await voterLen();
    setVoterCount(data);
  };
  //get Al Candidate
  const allCandidates = async () => {
    const data = await getAllCandidateAddress();
    console.log(data);
    setCandidate(data);
  };

  // Vote Function
  const voteACandidate = async(candidateAddress,candidateId) => {
    const data = await giveVote(candidateAddress,candidateId);
    
    if (data === "Successfully Voted"){
      alert(data);
    }
    else{
      alert(data);
    }
    
  }

  return (
    <div>
      <Navbar acc={account} />
      <div className="countContaner">
        <div className="numberContainer">
          <div className="numberOfCandidate">
            <h3>
              No. of Candidate : 
              {candidateCount ? " "+candidateCount : "Please select test net and reload the page"}
            </h3>
          </div>
          <div className="numberOfCandidate">
            <h3>
              No. of Voter : {voterCount ? " "+voterCount : "Please select test net and reload the page"}
            </h3>
          </div>
        </div>
      </div>
      <div className="CardDiv">
      {candidate.map((item, index) => (
        
          <CardComp address={item} func={voteACandidate}/>
        
      ))}
      </div>
    </div>
  );
}

export default Home;
