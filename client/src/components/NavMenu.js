import React, { useEffect, useState } from "react";
import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";



function NavMenu() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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
            </Navbar>
        </>
    )
}

export default NavMenu;