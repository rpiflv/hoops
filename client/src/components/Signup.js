import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate()

    const sendSignup = async (e) => {
        e.preventDefault();

        try {
            await authService.signup(email, pwd, username)
                .then(() => {
                    navigate('/');
                    window.location.reload();
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form>
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
        </Form>
    )
}

export default Signup;