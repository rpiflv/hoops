import React, { useEffect, useState } from "react";
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../App.css"

import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";



function NavMenu(props) {

    const navigate = useNavigate()
    const { user } = props

    const logout = () => {
        authService.logout();
        navigate('/')
        window.location.reload()
    }
    return (
        <>
            <Navbar expand="lg" bg="light" variant="light" sticky="top" className="navbarGrad">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                            <img src="./hoopsPNG.png" className="d-inline-block align-top" />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/teams">
                            <Nav.Link >NBA Teams</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {user &&
                        <Nav>
                            <LinkContainer to="/myplayers">
                                <Nav.Link>My players</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    {!user &&
                        <Nav>
                            <LinkContainer to="login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="signup">
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    }
                </Container>
            </Navbar>
        </>
    )
}

export default NavMenu;