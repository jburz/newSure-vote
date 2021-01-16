import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
// import '../../css/App.css';
import GroupPersons from './Groups';
import Persons from './Persons';
import Actions from './Actions';
import Navbar from "../components/Navbar.jsx";

class App2 extends Component {
  personsRef = React.createRef();
  actionsRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      selectedGroupId: ""
    }
  }

  onPersonGroupSelect = (personGroupId) => {
    // Cascade that to the Persons & actions element for loading
    this.personsRef.current.loadPersons(personGroupId);
    this.actionsRef.current.showActions(personGroupId);
  }

  render() {
    return (
      <>
        <Navbar />
        <Container>
          <Row className="app-header-title">
            <Col sm={1}>

            </Col>
            <Col sm={11}>
              <h1 className="app-title">
                Agatha 1.5.6.7 <Badge variant="primary" pill></Badge>
              </h1>
            </Col>
          </Row>
          <Row className="app-header-body">
            <Col>
              <GroupPersons onSelect={this.onPersonGroupSelect} />
            </Col>
            <Col>
              <Persons ref={this.personsRef} />
            </Col>
            <Col>
              <Actions ref={this.actionsRef} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App2;