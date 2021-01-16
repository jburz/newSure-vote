// import necessary modules/packages & components
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import GovElectData from "../seedData/govSeed";
import axios from 'axios';
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser.js";

// create functional component to hold data
const GovElect = () => {

  // set values for 'useState'
  const [candidateList, setCandidateList] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [candidate, setCandidate] = useState("");
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

  const submitVote = (event) => {
    event.preventDefault();
    if (candidateList && electionList && candidateList.length > 0 && electionList.length > 0) {
      const selectedCandidate = candidateList.find(currentCandidate => currentCandidate.name === candidate)
      const selectedElection = electionList.find(currentElection => currentElection.office === "Governor")
      const userVoting = userId.id
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
    <Container id="gov-elect-card">
      <Card bg="light">
        <Card.Body>
          <h3>Governor of Utah</h3>
          <hr />

          <Row>
            <Col xs lg={3}></Col>
            <Col xs lg={1}>
              <input
                type="radio"
                checked={candidate === "Spencer Cox"}
                disabled={voted}
                value="Spencer Cox"
                id="candidate1"
                onChange={(e) => {
                  setCandidate(e.target.value);
                }}
              />
            </Col>
            <Col xs lg={4}>
              <form>
                <div className="candidate-select">
                  <div className="candidate-radio">
                    <label>
                      {GovElectData[0].governor[0].party}
                      <br />
                      {GovElectData[0].governor[0].candidate}
                      {GovElectData[0].governor[0].office1}
                      <br />
                      {GovElectData[0].governor[0].runningMate}
                      {GovElectData[0].governor[0].office2}
                    </label>
                    <br />
                  </div>
                </div>
              </form>
            </Col>
            <Col xs lg={4}></Col>
          </Row>

          <Row>
            <Col xs lg={3}></Col>
            <Col xs lg={1}>
              <input
                type="radio"
                checked={candidate === "Chris Peterson"}
                disabled={voted}
                value="Chris Peterson"
                id="candidate2"
                onChange={(e) => {
                  setCandidate(e.target.value);
                }}
              />
            </Col>
            <Col xs lg={4}>
              <label>
                {GovElectData[0].governor[1].party}
                <br />
                {GovElectData[0].governor[1].candidate}
                {GovElectData[0].governor[1].office1}
                <br />
                {GovElectData[0].governor[1].runningMate}
                {GovElectData[0].governor[1].office2}
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

// export GovElect out of GovElect.jsx
export default GovElect;
