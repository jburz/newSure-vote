// import necessary packages/modules, components and stylesheets
import React, { useState } from "react";
import {
  Button,
  Jumbotron,
  Container,
  Card
} from "react-bootstrap";
import Navbar from "../components/Navbar.jsx";
import PresElect from "../components/PresElect";
import HouseElect from "../components/HouseElect";
import GovElect from "../components/GovElect";
import StSenElect from "../components/StSenElect";
import StHouseElect from "../components/StHouseElect";
import ScRetain from "../components/ScRetain";
import ConstAmend1 from "../components/ConstAmend1";
import ConstAmend2 from "../components/ConstAmend2";
// import "../scripts/seed";
import "./Ballot.css";
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser.js";
// import axios from 'axios';
import { Redirect } from "react-router-dom";


const Ballot = () => {

  const [userId] = useGlobalContextAuthUser();
  const [redirect, setRedirect] = useState(false);
  console.log("Ballot user: ", userId);
  // const [radio, setRadio] = useState([]);


  // useEffect(() => {
  //   sendVote()
  // }, [])

  // const sendVote = () => {
  //   axios.post('/api/vote' + radio)
  //     .then((res) => setRadio([...radio, res.data]))
  //     .catch(err => console.log (err));
  //     console.log(radio);
  // }


  // const submitVote = (event) => {
  //   // event.preventDefault();
  //   console.log(radio);
  //   axios.post('/api/vote', { key: radio })
  //     .then(() => console.log("Success"))
  //     .catch(err => console.log(err));
  // };

  const submitButton = () => {
    redirectHandler();

  }

  const redirectHandler = () => {
    setRedirect(true);
    console.log("redirect handler: ", redirect);
  }

  if (redirect) {
    return <Redirect to="/profile" />
  }

  //reroute to signin if not authenticated
  if (!userId.id) {
    console.log("ballot userid: ", userId);
    return (<Redirect to="/signin" />);
  }

  if (!userId.signInFace) {
    return (<Redirect to="/vote" />)
  }

  return (
    <>
      <Navbar />
      <Container id="main-container">
        <Jumbotron id="main-jumbotron">
          <h1>Ballot</h1>
          <hr />
          <h6>
            Click the radio button for the corresponding option to vote.
            When you are done, click submit.
          </h6>
          <h6>
            Ensure your selections are correct. If you encounter any
            problems, please click the 'Contact' button above.
          </h6>
          <PresElect />
          <HouseElect />
          <GovElect />
          <StSenElect />
          <StHouseElect />
          <ScRetain />
          <ConstAmend1 />
          <ConstAmend2 />

          <Container id="submit-card">
            <Card bg="light">
              <Card.Body>
                <h5>When you are done voting, click submit</h5>
                <h5>WARNING: You will not be able to return to this ballot.</h5>
                <br />
                <Button
                  variant="dark"
                  type="submit"
                  size="lg"
                  block
                  onClick={() => {
                    submitButton()
                    // sendVote(radio);
                  }}
                >
                  Submit
                  </Button>
              </Card.Body>
            </Card>
          </Container>
        </Jumbotron>
      </Container>
    </>
  );
};

// export Ballot from Ballot.jsx
export default Ballot;
