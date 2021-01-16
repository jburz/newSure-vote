// import necessary modules/packages, stylesheets and components
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import "./VoteHistory.css";
import axios from 'axios';
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser.js";

// create functional component to hold data
const VoteHistory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, getData] = useState();
  const [userId] = useGlobalContextAuthUser();

  // pulling data from back end to page
  useEffect(() => {
    voteData()
    console.log(userId.id, "Vote History")
  }, []);

  const voteData = () => {

    axios
      .get('/api/vote/' + userId.id)
      .then((res) => {
        const getVote = res.data;
        getData(getVote);
        console.log(getData)
        console.log(getVote)
      })
      .catch(err => {
        console.log(err);
      })
  }


  if (!data) {
    return (<> <h5>No votes recorded</h5></>);
  }


  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Vote History
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="title">Vote History</Modal.Title>
        </Modal.Header>
        <Row></Row>

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>2020</Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            {data.map((election) => (
              <ListGroupItem>
                <span className="span">
                  {election.election[0].office ? election.election[0].office : election.election[0].question}:
                  </span>
                {election.candidate.name}
                <br />
                {election.candidate.party}
              </ListGroupItem>
            )
            )}
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Previous Year</Card.Link>
            <Card.Link href="#">Next Year</Card.Link>
          </Card.Body>
        </Card>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// export VoteHistory out of VoteHistory.jsx
export default VoteHistory;