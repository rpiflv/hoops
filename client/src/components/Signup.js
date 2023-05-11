import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container } from "react-bootstrap";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const sendSignup = async (e) => {
        e.preventDefault();

        try {
            await authService.signup(email, pwd, username)
                .then(() => {
                    navigate('/');
                    window.location.reload();
                })
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.errors[0].msg);
        }
    }

    return (
        <Container>
            <Form>
                <Col xs={7}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={sendSignup}>
                        Submit
                    </Button>
                </Col>
            </Form>
            {errorMessage ? 
                <div className="modal display-block" >
                    <section className="modal-main">
                        <p><h4>Sign Up Error</h4></p>
                            <p>{errorMessage}</p>
                        <button onClick={() => setErrorMessage(null)}>Close</button>
                    </section>
                </div>
                :
                <></>
            }
        </Container>
    )
}

export default Signup;