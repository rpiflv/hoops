import React, { useState, useEffect } from "react";
import { Card, Nav , Container} from "react-bootstrap";
import logos from "../logos";
import '../App.css';
import Roster from "./Roster";
import TeamStats from "./TeamStats";
import { useParams } from "react-router-dom";
import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Team () {
    const [activeTab, setActiveTab] = useState("roster");
    const { teamId } = useParams();
    const [roster, setRoster] = useState([]);
    const [teamcolor, setTeamColor] = useState('');
    const [teamcolorSec, setTeamColorSec] = useState('');
    const [teamStats, setTeamStats] = useState([])


    
    useEffect(() => {
        const getTeamData = async (teamId) => {
            try {
                const response = await axios.get(BASE_URL + `/api/teams/${teamId}/`);
                console.log(response.data)
                setRoster(response.data.data.players);
                setTeamColor(response.data.data.team_colors[0].hex_color);
                setTeamColorSec(response.data.data.team_colors[1].hex_color);
                setTeamStats(response.data.stats)
            } catch (error) {
                console.error(error);
            }
        };
        getTeamData(teamId);
    }, []);

    const handleSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container maxwidth="x1">
            <Card className="border-light team-box"> 
            <Card.Header>
                <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className="custom-nav-pills">
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
            <img src={logos[`${teamId}`]} style={{ width: "150px", marginBottom:"1%" }} alt="logo"/>
            <br />
            </Card.Title>
            <Card.Body>
            {activeTab === "roster" &&
            <Roster 
            roster={roster}
            teamcolor={teamcolor}
            teamcolorSec={teamcolorSec}
            setRoster={setRoster}
            setTeamColor={setTeamColor}
            setTeamColorSec={setTeamColorSec}
            />
            }
            {
            activeTab === "teamStats" && 
            <>
            <TeamStats
            teamStats={teamStats}
            // setTeamStats={setTeamStats}
            />
            {console.log(teamStats)}
            </>
            }
            </Card.Body>
            </Card>
        </Container>
    )
}

export default Team;