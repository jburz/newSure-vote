// import necessary modules/packages & components
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import StSenElectData from "../seedData/stsenSeed";
import axios from 'axios';
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser.js";

// create functional component to hold data
const StSenElect = () => {

  const [candidateList, setCandidateList] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [voted, setVoted] = useState(false);
  const [userId] = useGlobalContextAuthUser();


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

  const submitVote = (event) => {
    event.preventDefault();
    if (candidateList && electionList && candidateList.length > 0 && electionList.length > 0) {
      const selectedCandidate = candidateList.find(currentCandidate => currentCandidate.name === candidate)
      const selectedElection = electionList.find(currentElection => currentElection.office === "Utah State Senator")
      const userVoting = userId.id
      console.log(userVoting);
      axios.post('/api/vote', { candidate: selectedCandidate._id, election: selectedElection._id, userId: userVoting })
        .then((res) => {
          // console.log(res.data)
          setVoted(true)
          setCandidate()
          setElectionList();
          if (res.data.error) {
            alert(res.data.error);
          } else {
            alert("You voted for " + candidate + ".");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Container id="statesen-elect-card">
      <Card bg="light">
        <Card.Body>
          <h3>{StSenElectData[0].office}</h3>
          <h5>{StSenElectData[0].district}</h5>
          <hr />

          <Row>
            <Col xs lg={3}></Col>
            <Col xs lg={1}>
              <input
                type="radio"
                checked={candidate === "John Johnson"}
                disabled={voted}
                value="John Johnson"
                id="candidate1"
                onChange={(e) => {
                  setCandidate(e.target.value);
                }}
              />
            </Col>
            <Col xs lg={4}>
              <label>
                {StSenElectData[0].stateSenator[0].party}
                <br />
                {StSenElectData[0].stateSenator[0].candidate}
              </label>
            </Col>
            <Col xs lg={4}></Col>
          </Row>

          <Row>
            <Col xs lg={3}></Col>
            <Col xs lg={1}>
              <input
                type="radio"
                checked={candidate === "Katy Owens"}
                disabled={voted}
                value="Katy Owens"
                id="candidate2"
                onChange={(e) => {
                  setCandidate(e.target.value);
                }}
              />
            </Col>
            <Col xs lg={4}>
              <label>
                {StSenElectData[0].stateSenator[1].party}
                <br />
                {StSenElectData[0].stateSenator[1].candidate}
              </label>
            </Col>
            <Col xs lg={4}></Col>
          </Row>

          <Button
            variant="dark"
            type="submit"
            size="lg"
            block
            disabled={!candidate || voted}
            onClick={submitVote}
          >
            Submit
            </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

// export StSenElect out of StSenElect.jsx
export default StSenElect;
