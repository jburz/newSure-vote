// import Rreact, elements from React-Bootstrap, SignUp.css
import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form, Jumbotron } from "react-bootstrap";
import './SignIn.css'
import axios from "axios";
import { useGlobalContextAuthUser } from "../utils/GlobalContextAuthUser";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";


// create functional component to hold sign up page data
const SignIn = () => {

    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [userId, dispatch] = useGlobalContextAuthUser();
    const [redirect, setRedirect] = useState(false);
    //console.log("Signin user: ", userId);

    // create function for submit button 'onclick'
    const submitBtn = () => {
        //console.log(usernameLogin);
        //console.log(passwordLogin);

        if (usernameLogin === "" || passwordLogin === "") {
            alert("Missing username or password");
            console.log("Missing username or password");
        } else {
            const userLoginObj = {
                username: usernameLogin,
                password: passwordLogin
            }

            //create new user in database
            axios.post("/api/login",
                userLoginObj
            ).then((res) => {
                console.log("label", res.data);

                //once user is created store userid and personid in global context
                dispatch({ type: "UPDATE_USERID", payload: res.data.userId });
                dispatch({ type: "UPDATE_PERSONID", payload: res.data.personId });
                dispatch({ type: "UPDATE_UUID", payload: res.data.uuid });

                redirectHandler();
                console.log("Redirect to profile");

            }).catch(err => {
                console.log(err);
            });
        }
    }

    const handleKeypress = e => {
        if (e.charCode === 13) {
            submitBtn();
        }
    }

    const redirectHandler = () => {
        setRedirect(true);
        console.log("redirect handler: ", redirect);
    }

    if (redirect) {
        return <Redirect to="/profile" />
    }
    // const renderRedirect = () => {
    //     if (redirect) {
    //         console.log("render handler: ", redirect);
    //         return <Redirect to="/cam2" />
    //     }
    // }


    return (
        <>
            <Navbar />
            <Container id="main-container">
                <Jumbotron id="main-jumbotron">
                    <h1>Sign In</h1>
                    <hr />
                    <Form id="signIn-form">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={e => setUsernameLogin(e.target.value)}
                                onKeyPress={handleKeypress}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={e => setPasswordLogin(e.target.value)}
                                onKeyPress={handleKeypress}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your password with anyone.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <br />
                    <ButtonGroup size="lg" className="mr-3">
                        <Button href='/' variant="dark"
                            type="submit" id='right-button'>Go Back</Button>
                    </ButtonGroup>

                    <ButtonGroup size="lg" className="mr-3">
                        <Button onClick={() => { submitBtn() }} variant="dark"
                            id='left-button'>Continue</Button>
                    </ButtonGroup>
                </Jumbotron>
            </Container>
        </>
    );
};

// export component from SignUp.jsx
export default SignIn;