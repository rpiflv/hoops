import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import authService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"

import Nav from 'react-bootstrap/Nav';




function NavMenu(props) {

    const navigate = useNavigate()
    const { user } = props

    // const history = useHistory()

    const logout = () => {
        authService.logout();
        navigate('/')
        window.location.reload()
    }
    return (

        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/" className="mx-3">
                <img src="./hoopsBlack.png" className="d-inline-block align-top" height={100} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="d-flex">
                    <Nav.Link as={Link} to="/teams" className="">NBA Teams</Nav.Link>
                </Nav>
                <Nav className="d-flex ms-auto">
                    {!user &&
                        <>
                            <Nav.Link as={Link} to={"login"} className="ms-auto">Login</Nav.Link>
                            <Nav.Link as={Link} to={"signup"} className="">Sign Up</Nav.Link>
                        </>
                    }
                    {user &&
                        <>
                            <Nav.Link as={Link} to={"myplayers"} className="ms-auto">My Players</Nav.Link>
                            <Nav.Link as={Link} to={"/"} >Logout</Nav.Link>
                        </>

                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavMenu;