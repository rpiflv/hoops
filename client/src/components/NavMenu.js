import React, { useEffect, useState } from "react";
import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";



function NavMenu() {
    return (
        <>

            <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                            <img src="./hoopsPNG.png" className="d-inline-block align-top" />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/teams">Teams</Link>
                    </Nav>
                    <Nav className="">
                        <Link to="/myplayers">My players</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavMenu;