import React, { useEffect, useState } from "react";
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function NavMenu() {
    return (
        <>

            <Navbar expand="lg" bg="light" variant="light" sticky="top">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                            <img src="./hoopsPNG.png" className="d-inline-block align-top" />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/teams">
                            <Nav.Link >Teams</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="">
                        <LinkContainer to="/myplayers">
                            <Nav.Link>My players</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavMenu;