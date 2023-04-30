import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar/Navbar";
import Input from "../components/Input/Input";
import Web3 from "web3";
import { connectWallet, createVoter, winner } from "../Api/api";
import {useNavigate} from 'react-router-dom'
import '../styles/MasterStyle.css'



function CreateVoters() {

  let navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    age: "",
    address: "",
  });
  const [account, setAccount] = useState("");

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
  }, []);



  // Submit Function

  const submit = async () => {
    if (details.name === "" || details.age === "" || details.address === "") {
      alert("Please fill all fields");
    } else {
      const checkaAddess = isValidAddress(details.address);
      if (checkaAddess) {
        const data = await createVoter(
          details.address,
          details.age,
          details.name
        );
        if (data === "Voter Created Sccessfully") {
          alert(data);
          let path = `/`; 
          navigate(path);
        } else {
          alert(data);
        }
      } else {
        alert("Please Enter a valid Address");
      }
    }
  };

  // Check the address is valid or not

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3();
      web3.utils.toChecksumAddress(adr);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div>
      <Navbar acc={account} />
      <div
        style={{ justifyContent: "center", display: "flex", padding: "1rem" }}
      >
        <h1 style={{ color: "white", fontWeight: "600" }}>Create Voter</h1>
      </div>

      <div className="container">
        <div className="main_container">
          <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" />
          <Input
            place="Name"
            func={(e) => {
              setDetails({ ...details, name: e.target.value });
            }}
          />
          <Input
            place="Age"
            func={(e) => {
              setDetails({ ...details, age: e.target.value });
            }}
          />
          <Input
            place="Address"
            func={(e) => {
              setDetails({ ...details, address: e.target.value });
            }}
          />
          <Button func={submit} />
        </div>
      </div>
    </div>
  );
}

export default CreateVoters;
