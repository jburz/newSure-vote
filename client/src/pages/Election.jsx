// import necessary modules/packages, stylesheets and components
import React from 'react';
import './Election.css'
import Navbar from "../components/Navbar.jsx";
import { useGlobalContextAuthUser } from '../utils/GlobalContextAuthUser.js';
import { Redirect } from "react-router-dom";
import { Card, Container, ListGroup } from 'react-bootstrap';

// create functional component to hold data
const Election = () => {

    const [userId] = useGlobalContextAuthUser();
    console.log("Election user: ", userId);

    //reroute to signin if not authenticated
    if (!userId.id) {
        return (<Redirect to="/signin" />);
    }

    return (
        <>
            <Navbar />
            <Container id="main-container">
                <Card className="mainCard" style={{ width: "30rem" }}>
                    <Card.Title id="card-title">
                        Upcoming Elections
                        </Card.Title>
                    <Card.Body>
                        <hr />
                        <Card.Title id="state-election">
                            State Elections
                        </Card.Title>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                    </Card.Body>
                    <br />
                    <Card.Body>
                        <hr />
                        <Card.Title id="federal-election">
                            Federal Elections
                        </Card.Title>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                        <ListGroup.Item>
                            Name of Candidate/Party
                    </ListGroup.Item>
                    </Card.Body>
                    <br />
                    <br />
                </Card>
            </Container>
        </>
    )
}

// export Election out of Election.jsx
export default Election;