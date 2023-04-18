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
                            <img src="./hoopsBlack.png" className="d-inline-block align-top" height={100} />

                            {/* <img src="./hoopsLogoTransp.png" className="d-inline-block align-top" /> */}
                        </Link>
                    </Navbar.Brand>

                    <ul className="nav">
                        <li className="nav-item">

                            <Nav className="me-auto">
                                <LinkContainer to="/teams">
                                    <Nav.Link bsPrefix="navLink" className="nav-item">NBA Teams</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </li>
                        {user &&
                            <Nav>
                                <li className="nav-item">

                                    <LinkContainer to="/myplayers">
                                        <Nav.Link bsPrefix="navLink">My players</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li className="nav-item">
                                    <LinkContainer to="/">
                                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    </LinkContainer>
                                </li>
                            </Nav>
                        }
                        {!user &&
                            <>
                                <Nav>
                                    <li className="nav-item">
                                        <LinkContainer to="login">
                                            <Nav.Link bsPrefix="navLink">Login</Nav.Link>
                                        </LinkContainer>
                                    </li>
                                </Nav>
                                <Nav>
                                    <li className="nav-item">
                                        <LinkContainer to="signup">
                                            <Nav.Link bsPrefix="navLink">Sign Up</Nav.Link>
                                        </LinkContainer>
                                    </li>
                                </Nav>
                            </>
                        }
                    </ul>
                </Container>
            </Navbar>
        </>
    )
}

export default NavMenu;