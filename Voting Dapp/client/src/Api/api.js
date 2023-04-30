import web3 from "web3";
import Election from "../contracts/Election.json";

export async function connectWallet() {
  let provider = await window.ethereum;
  const Web3 = new web3(provider);
  const netId = await Web3.eth.net.getId();

  const account = await Web3.eth.requestAccounts();
  const { address } = Election.networks[netId];
  let instance = await new Web3.eth.Contract(Election.abi, address);
  return { account, instance };
}

// ----------------- API ---------------

// Candidate Length
export const candidateLen = async () => {
  const { instance } = await connectWallet();
  try {
    const data = await (await instance).methods.getCandidateLength().call();
    // console.log(data);
    return data
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Voter Length
export const voterLen = async () => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getVoterLength().call();
  console.log(data);
  return data;
};

// Create Candidate
export const createCandidate = async (address, age, name) => {
  const { instance, account } = await connectWallet();
  try {
    const data = await (await instance).methods
      .setCandidate(address, age, name)
      .send({ from: account[0], gas: "1000000" });
    console.log(data);
    return "Candidate created sucessfully";
  } catch (error) {
    console.log(error);
    return ("Something Went Wrong...Only OWNER can create candidate");
  }
};

// Get all Candidate Address
export const getAllCandidateAddress = async () => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getCandidate().call();
  console.log(data);
  return data;
};

// Get a Candidate Details
export const getACandidateDetails = async (address) => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getCandidateData(address).call();
  console.log(data);
  return data;
};

// Create Voter
export const createVoter = async (address, name, age) => {
  const { instance, account } = await connectWallet();
  try {
    const data = await (await instance).methods
      .voterRight(address, name, age)
      .send({ from: account[0], gas: "1000000" });
    return "Voter Created Sccessfully";
  } catch (error) {
    return "Something Went Wrong...Only OWNER can create Voter";
  }
};

// Give Vote
export const giveVote = async (candidateAddress, candidateVoteId) => {
  const { instance, account } = await connectWallet();
  try {
    const data = await (await instance).methods
      .vote(candidateAddress, candidateVoteId)
      .send({ from: account[0], gas: "1000000" });
    console.log(data);
    return "Successfully Voted";
  } catch (err) {
    return ("Something Went Wrong...You have no right to vote");
  }
};

// Get A Voter Details

export const getAVoterDetails = async (address) => {
  const { instance, account } = await connectWallet();
  try {
    const data = await (await instance).methods
      .getVoterData(address)
      .send({ from: account[0], gas: "1000000" });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Get all voted voter list

export const getAllVotedVoterAddress = async (address) => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getVotedVoterList().call();
  console.log(data);
  return data;
};
// Get all voter list

export const getAllVoterAddress = async (address) => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getVoterList().call();
  console.log(data);
  return data;
};
// Get all Winner

export const winner = async (address) => {
  const { instance } = await connectWallet();
  const data = await (await instance).methods.getWinner().call();
  console.log(data);
  return data;
};
