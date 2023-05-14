import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Card, Nav , Container, Row, Col, Table} from "react-bootstrap";

import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';
import Roster from "./Roster";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Team () {

    // const [roster, setRoster] = useState();
    // const [teamStats, setTeamStats] = useState();
    const [activeTab, setActiveTab] = useState("roster");
    const { teamId } = useParams();


    const handleSelect = (tab) => {
        setActiveTab(tab);
    }

    return (
        <Container>
            <Card className="border-light roster-box"> 
            <Card.Header>
                <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="roster">
                        Roster
                        </Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link eventKey="teamStats">
                        Team Stats
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Title>
            <br />
            <img src={logos[`${teamId}`]} style={{ width: "150px", marginBottom:"5%" }} />
            <br />
            </Card.Title>
            <Card.Body>
            {activeTab === "roster" &&
        
            <Roster/>
            
            
            }
            </Card.Body>
            </Card>
        </Container>
    )
}

export default Team;