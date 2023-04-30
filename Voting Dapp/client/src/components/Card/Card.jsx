import React, {useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'
import { getACandidateDetails } from '../../Api/api';

function CardComp({address,func}) {
  const [candidateDetails, setCandidateDetails] = useState([])
  useEffect(() => {
    getCanDidateDetails();

  },[])

  // Candidate Details Function
  const getCanDidateDetails = async() => {
    const data = await getACandidateDetails(address);
    console.log(data);
    setCandidateDetails(data)
  }
  return (
    <Card style={{ width: '18rem', marginLeft: "1rem" }}>
      <Card.Img variant="top" width="180px" height="120px" className='cardImage' src="https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000" />
      <Card.Body style={{justifyContent: "center", textAlign: "center"}}>
        <Card.Title>{candidateDetails[1]}</Card.Title>
        <Card.Text>
          <h6>{address}</h6>
        </Card.Text>
        <Card.Text>
          <h6>Age: {candidateDetails[0]}</h6>
        </Card.Text>
        
        <Card.Text>
          Vote: {candidateDetails[3]}
        </Card.Text>
        <Button variant="primary" onClick={() => func(address,candidateDetails[2])}>Vote</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComp;