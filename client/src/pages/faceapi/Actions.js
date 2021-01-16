import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { Loader } from 'react-overlay-loader';
import ApiCalls from "../../utils/ApiCalls";
import 'react-overlay-loader/styles.css';
import { trainingStart } from '../../utils/Training'
import { letsSeeYourFace } from '../../utils/Identify'
// import IdentificationHelper from "../../utils/IdentificationHelper";



class Actions extends Component {



    showActions(personGroupId) {
        this.setState({ personGroupId: personGroupId, show: true });
        console.log(this.setState({ personGroupId: personGroupId, show: true }))
    }
    render() {
        return (
            !this.state.show ? (
                <Fragment></Fragment>
            ) : (
                    <fieldset className="col-header">
                        <legend>Actions</legend>
                        <Container>
                            <Row>
                                <Col>
                                    <TrainGroup personGroupId={this.state.personGroupId} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Identify personGroupId={this.state.personGroupId} />
                                </Col>
                            </Row>
                        </Container>
                    </fieldset>
                )
        )
    }
}

class Identify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            picture: null,
            showLoadingOverlay: false,
            results: null,
            showResults: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ modalOpen: true })
    }

    closeModal() {
        this.setState({ modalOpen: false })
    }

    setPicture = e => {
        this.setState({ picture: e.target.files[0] })
    }

    identificationCompleteted(output) {
        this.setState({ results: output, showResults: true, showLoadingOverlay: false });
        console.log(output, "this is the result being passed")
    }
    identify = e => {
        if (this.state.picture !== null) {
            this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
                var reader = new FileReader();
                // var pid = "fa704750-0b81-43d0-a3a4-3e025f3eb2ba"
                letsSeeYourFace(this.props.personGroupId, reader.result, this.personGroupId.personId, this.personGroupId.personId.confidence, this.identificationCompleteted(), () => {

                })
            })
        }
    }








    render() {
        console.log(this.state.results, "this should be the results")
        let modalClose = () => this.setState({ showResults: false });

        return (
            <Fragment>
                <Button variant="primary" className="action-but" onClick={this.openModal}>Identify</Button>
                <Modal show={this.state.modalOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload a picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formPersonPicture">
                                <Form.Label>Pick a local picture</Form.Label>
                                <Form.Control type="file" accept='image/*' placeholder="Local picture" onChange={this.setPicture} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.identify}>
                            Identify
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Loader fullPage loading={this.state.showLoadingOverlay} text="Identification ..."
                    containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />
                <IdentficationResults show={this.state.showResults} onHide={modalClose} results={this.state.results} />
            </Fragment>
        );
    }
}

class IdentficationResults extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }
    render() {
        return (
            <Modal {...this.props}>
                <Modal.Header closeButton>
                    <Modal.Title>Results of the identification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        //     this.props.results !== null &&
                        //     <Alert variant={this.props.results.ok ? "success" : "danger"}>
                        //         {this.props.results.ok === false &&
                        //             <Fragment>{this.props.results.message}</Fragment>
                        //         }
                        //         {this.props.results.ok === true &&
                        //             <Fragment>
                        //                 {this.props.results.message}
                        //                 {this.props.results.candidates.map((c) => { return `${c.name} with a confidence of ${c.confidence}` }).join(",")}
                        //             </Fragment>
                        //         }
                        //     </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}
// Training does not work on click right now and is an issue for latter 1/5++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class TrainGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLoadingOverlay: false
        }
    }

    startTraining = e => {
        this.setState({ showLoadingOverlay: true }, () => {
            trainingStart(this.props, () => {
            })

        });


    }

    checkTraining() {
        var api = new ApiCalls();
        api.Get(api.personGroupTrainingCheckEndPoint(this.props.personGroupId))
            .then(response => response.json())
            .then(data => {
                if (data.status === "succeeded") {
                    // Don
                    clearInterval(this.timer);
                    this.timer = null;
                    this.setState({ showLoadingOverlay: false });
                }
            });
    }

    render() {
        return (
            <Fragment>
                <Button variant="primary" className="action-but" onClick={this.startTraining}>Train group</Button>
                <Loader fullPage loading={this.state.showLoadingOverlay} text="Training in progress ..."
                    containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />
            </Fragment >
        );
    }
}
export default Actions;