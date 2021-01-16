// import necessary packages/modules, components and stylesheets
import React, { useState } from "react";
import axios from 'axios';
import {
    Button,
    Container,
    Form,
    Jumbotron
} from "react-bootstrap";
import './Contact.css'
import Navbar from '../components/Navbar.jsx'
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser";

// create Contact functional component to hold data
const Contact = () => {

    // establish state and set state values
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [messageValue, setMessageValue] = useState('');
    const [userId] = useGlobalContextAuthUser();
    console.log("Contact user: ", userId);

    // create function for submit button
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/send',
            {
                name: nameValue,
                email: emailValue,
                message: messageValue
            })
            .then((response) => {
                if (response.data.status === 'success') {
                    setNameValue('');
                    setEmailValue('');
                    setMessageValue('');
                    alert("Message Sent.");
                } else if (response.data.status === 'fail') {
                    alert("Message failed to send.")
                }
            })
    }

    // return data to the page
    return (
        <>
            <Navbar />
            <Container id="main-container">
                <Jumbotron id="main-jumbotron">
                    <h1 className="header">Contact Us</h1>
                    <hr />
                    <div>
                        <h6>801.867.5309</h6>
                    </div>
                    <div>
                        <h6>SLC, UT</h6>
                    </div>
                    <a id="email-text" href='mailto:surev0te@zohomail.com'>surev0te@zohomail.com</a>
                    <hr />
                    <Form id="contact-form">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label></Form.Label>
                            <Form.Control type="name" placeholder="Your Name" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label></Form.Label>
                            <Form.Control type="email" placeholder="Your Email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control type="message" placeholder="Your Message" as="textarea" rows={2} value={messageValue} onChange={(e) => setMessageValue(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <br />
                    <Button size="lg" variant="dark" id="submitBtn" onClick={handleSubmit}>Send</Button>
                </Jumbotron>
            </Container>
        </>
    );
};

// export Contact out of Contact.jsx
export default Contact;