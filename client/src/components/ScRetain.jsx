// import necessary modules/packages & components
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import ScRetainData from '../seedData/scretainSeed';
import axios from 'axios';
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser.js";

// create functional component to hold data
const ScRetain = () => {

  const [candidateList, setCandidateList] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [voted, setVoted] = useState(false);
  const [userId] = useGlobalContextAuthUser();

  // pulling data from back end to page
  useEffect(() => {
    axios
      .get('/api/candidate')
      .then((res) => {
        const candidateData = res.data.getCandidate;
        setCandidateList(candidateData);
        // console.log(candidateData)
      })

    axios
      .get('/api/election')
      .then((res) => {
        const electionData = res.data.getElection;
        setElectionList(electionData);
        // console.log(electionData)
      })
  }, []); 

  const scJustice = ScRetainData[0].candidate;

  const submitVote = (event) => {
    event.preventDefault();
    if (candidateList && electionList && candidateList.length > 0 && electionList.length > 0)
    {
    // const selectedCandidate = candidateList.find(currentCandidate => currentCandidate.name === answer)
    const selectedElection = electionList.find(currentElection => currentElection.office === "Utah Supreme Court")
    const userVoting = userId.id
    console.log(userVoting);
    axios.post('/api/vote', { election: selectedElection._id, userId: userVoting })
      .then((res) => {
        // console.log(res.data)
        setVoted(true)
        setAnswer()
        setElectionList();
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("You voted for " + answer + ".");
          }
          console.log(res.data.error)
      })
      .catch(err => console.log (err));
    }
    };

  return (
    <Container id="scretain-elect-card">
      <Card bg="light">
        <Card.Body>
          <h3>Utah Supreme Court Retention</h3>
          <h6>Should John A. Pearce be retained in the Utah Supreme Court?</h6>
          <hr />

          <Row>
            <Col xs lg={5}></Col>
            <Col xs lg={1}>  
              <form>
                <input
                  type="radio"
                  checked={answer === "yes"}
                  disabled={voted}
                  value="yes"
                  id="answer1"
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
                </form>
              </Col>
            <Col xs lg={1}>
                <p>Yes</p>
            </Col>
            <Col xs lg={5}></Col>
          </Row>

          <Row>
            <Col xs lg={5}></Col>
            <Col xs lg={1}>  
              <form>
                <input
                  type="radio"
                  checked={answer === "no"}
                  disabled={voted}
                  value="no"
                  id="answer2"
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
                </form>
              </Col>
            <Col xs lg={1}>
                <p>No</p>
            </Col>
            <Col xs lg={5}></Col>
          </Row>

          <Button 
              variant="dark" 
              type="submit"
              size="lg" 
              block
              disabled={!answer || voted}
              onClick={submitVote}
            >
              Submit
            </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

// export ScRetain out of ScRetain.jsx
export default ScRetain;
