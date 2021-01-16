// import necessary modules/packages, stylesheets & components
import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import "./Modal.css";

// create functional component to hold data
function Update() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Update Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="title">* All Fields Required *</Modal.Title>
        </Modal.Header>
        <Form id="modal-form">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control size="sm" type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control size="sm" type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control size="sm" type="text" placeholder="Street Address:" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control size="sm" type="text" placeholder="City" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control size="sm" type="text" placeholder="State" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control size="sm" type="text" placeholder="ZIP CODE" />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// export Update out of Update.jsx
export default Update;
