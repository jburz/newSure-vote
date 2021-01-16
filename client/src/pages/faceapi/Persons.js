import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ApiCalls from "../../utils/ApiCalls";
import Fetchino from 'react-fetchino';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { submitToAgatha } from '../../utils/submitApiImgP';
import { newUserApi } from '../../utils/newUserfaceApi'


class PersonActionDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoadingOverlay: false,
            modalOpen: false
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

    delete = e => {
        this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
            var api = new ApiCalls();
            api.Delete(api.personsEndPoint(this.props.personGroupId, this.props.person.personId))
                .then(rest => {
                    this.setState({ showLoadingOverlay: false }, () => {
                        this.props.onChanged();
                    });
                });
        });
    }

    render() {
        return (
            <Fragment>
                <Button className="add-button" variant="primary" onClick={this.openModal}>
                    delete
        </Button>

                <Modal show={this.state.modalOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the person '{this.props.person.name}'
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.delete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Loader fullPage loading={this.state.showLoadingOverlay} containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />

            </Fragment>
        )
    }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export class PersonActionUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            picture: "",
            showLoadingOverlay: false
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




    submit = e => {
        this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
            submitToAgatha(this.props.personGroupId, this.props.person.personId, this.state.picture, () => {
                // this.setState({ showLoadingOverlay: false }, () => {
                //     this.closeModal();
                //     this.props.onChanged();

            })

        });
    }
    render() {
        console.log(this.submit)
        return (
            <Fragment>
                <Button className="add-button" variant="primary" onClick={this.openModal}>
                    upload
            </Button>

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
                        <Button variant="primary" onClick={this.submit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    <Loader fullPage loading={this.state.showLoadingOverlay} containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />
                </Modal>
            </Fragment>
        )
    }
}

class PersonActionEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            newPersonName: "FUCKING RIGHT1!",
            showLoadingOverlay: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ openModal: true })
    }

    closeModal() {
        this.setState({ openModal: false })
    }

    setNewPersonName = e => {
        this.setState({ newPersonName: e.target.value })
    }

    edit = e => {
        this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
            let body = {
                name: this.state.newPersonName,
                userData: ""
            };

            var api = new ApiCalls();
            api.Patch(api.personsEndPoint(this.props.personGroupId, this.props.person.personId), body)
                .then(rest => {
                    // Tell the parent we've added a new item
                    this.setState({ showLoadingOverlay: false }, () => {
                        this.closeModal();
                        this.props.onChanged();
                    });
                });
        });
    }

    render() {
        // console.log(this.props.person, "lets see what up")

        return (
            <Fragment>

                <Button className="add-button" variant="primary" onClick={this.openModal}>
                    edit
                </Button>
                <Modal show={this.state.openModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formPersonName">
                                <Form.Label>Person name</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.person.name} onChange={this.setNewPersonName} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.edit}>
                            Save Changes
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Loader fullPage loading={this.state.showLoadingOverlay} containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />
            </Fragment>
        );
    }
}

class PersonsItmes extends Component {

    onChanged = () => {
        // Cascade up for refresh
        this.props.onChanged();
    }

    render() {
        return (
            this.props.persons.map((person) =>
                <Container className="person-list">
                    <Row key={person.personId}>
                        <Col sm={10}>

                            <h5>{person.name}</h5>
                            <p>
                                {person.persistedFaceIds.length} pictures
            </p>
                        </Col>
                        <Col sm={2} className="group-actions-button">
                            <PersonActionUpload onChanged={this.onChanged} person={person} personGroupId={this.props.personGroupId} />
                            <PersonActionDelete onChanged={this.onChanged} person={person} personGroupId={this.props.personGroupId} />
                            <PersonActionEdit onChanged={this.onChanged} person={person} personGroupId={this.props.personGroupId} />
                        </Col>
                    </Row>
                </Container>
            )
        );
    }
}
class Persons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            personGroupId: ""
        }
    }

    loadPersons(selectedPersonGroupId) {
        this.setState({ personGroupId: selectedPersonGroupId, show: true });
    }

    onChanged = () => {
        this.forceUpdate(() => { });
    }

    render() {
        var api = new ApiCalls();
        const url = api.personsEndPoint(this.state.personGroupId);
        const headers = api.getCommonHeaders();
        const options = {
            headers
        };
        return (
            !this.state.show ? (
                <Fragment></Fragment>
            ) : (
                    <fieldset className="col-header">
                        <legend><AddPerson onChanged={this.onChanged} personGroupId={this.state.personGroupId} /> Persons</legend>
                        <Fragment>
                            <Fetchino
                                url={url}
                                options={options}
                                render={({ loading, error, data }) => (
                                    <Fragment>
                                        {loading && <Loader loading containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />}
                                        {error && <div>{error}</div>}
                                        {data && <PersonsItmes persons={data} personGroupId={this.state.personGroupId} onChanged={this.onChanged} />}
                                    </Fragment>
                                )}
                            />
                        </Fragment>
                    </fieldset>
                )
        );
    }
}

class AddPerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            newPersonName: "class demo",
            showLoadingOverlay: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ openModal: true })
    }

    closeModal() {
        this.setState({ openModal: false })
    }

    setNewPersonName = e => {
        this.setState({ newPersonName: e.target.value })
        console.log(this.setState({ newPersonName: e.target.value }), "PID")
    }

    submit = e => {
        this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
            newUserApi(this.props.personGroupId, this.state.newPersonName, () => {

            });
        }
        )
    }

    render() {
        return (
            <Fragment>

                <Button className="add-button" variant="primary" onClick={this.openModal}>
                    Push me
            </Button>
                <Modal show={this.state.openModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>YO Add a new person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formPersonName">
                                <Form.Label>Person name</Form.Label>
                                {/* this has made any imput a hard coded valus from add person even if i do enter text in the box aka the text box is usless */}
                                <Form.Control type="text" placeholder="sup my dude" onChange={this.setNewPersonName} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={this.submit}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Loader fullPage loading={this.state.showLoadingOverlay} />
            </Fragment>
        );
    }
}


export default Persons;