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
            <Navbar expand="lg" sticky="top" className="navBarBlack">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                        <img src="./hoopsBlack.png" className="d-inline-block align-top" height={100}/>

                            {/* <img src="./hoopsLogoTransp.png" className="d-inline-block align-top" /> */}
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/teams">
                            <Nav.Link bsPrefix="navLink">NBA Teams</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {user &&
                        <Nav>
                            <LinkContainer to="/myplayers">
                                <Nav.Link bsPrefix="navLink">My players</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    {!user &&
                        <Nav>
                            <LinkContainer to="login">
                                <Nav.Link bsPrefix="navLink">Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="signup">
                                <Nav.Link bsPrefix="navLink">Sign Up</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    }
                </Container>
            </Navbar>
        </>
    )
}

export default NavMenu;