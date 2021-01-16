import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import ApiCalls from "../../utils/ApiCalls";
import Fetchino from 'react-fetchino';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class GroupPersonsItems extends Component {
    onSelect = (e, personGroupId) => {
        this.props.onSelect(personGroupId);
    }

    onChanged = () => {
        // Item has been deleted, tell the parent to refresh
        this.props.onChanged();
    }

    render() {
        const groups = this.props.groups
        return (
            groups.map((group) =>
                <Container key={group.personGroupId} className="group-list">
                    <Row>
                        <Col sm={10} onClick={(e) => this.onSelect(e, group.personGroupId)}>

                            <h5>{group.name}</h5>
                        </Col>
                        <Col sm={2} className="group-actions-button">


                        </Col>
                    </Row>
                </Container>
            )
        )
    }
}
// this will not be
class GroupPersons extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSelection = (personGroupId) => {
        this.props.onSelect(personGroupId);
    }

    onChanged = () => {
        // Item has been added/removed/updated, relead the component
        this.forceUpdate(() => { });
    }

    render() {
        var api = new ApiCalls();
        const url = api.personGroupsEndPoint();
        const headers = api.getCommonHeaders();
        const options = {
            headers
        };

        return (
            <Fragment>
                <fieldset className="col-header">
                    {/* this is the add groups btn */}
                    <legend><AddGRoupPerson onChanged={this.onChanged} /> Groups</legend>
                    <Fragment>
                        <Fetchino
                            url={url}
                            options={options}
                            render={({ loading, error, data }) => (
                                <Fragment>
                                    {loading && <Loader loading containerStyle={{ background: "rgba(255, 255, 255, 0.9)" }} />}
                                    {error && <div>{error}</div>}
                                    {data && <GroupPersonsItems groups={data}
                                        onSelect={this.handleSelection}
                                        onChanged={this.onChanged} />
                                    }
                                </Fragment>
                            )}
                        />
                    </Fragment>
                </fieldset>
            </Fragment>
        );
    }
}

class AddGRoupPerson extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            newGroupName: "class demo",
            newGroupID: "5595",
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

    setNewGroupName = e => {
        this.setState({ newGroupName: e.target.value })
    }

    setNewGroupID = e => {
        this.setState({ newGroupID: e.target.value })
    }

    submit = e => {
        this.setState({ modalOpen: false, showLoadingOverlay: true }, () => {
            let body = {
                name: "class demo",
                userData: "1234",
                recognitionModel: ""
            };

            var api = new ApiCalls();
            api.Put(api.personGroupsEndPoint(this.state.newGroupID), body)
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
        return (
            <Fragment>

                <Button className="add-button" variant="primary" onClick={this.submit}>
                    Push me
                </Button>


            </Fragment>
        );
    }
}

export default GroupPersons