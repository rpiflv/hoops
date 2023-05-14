import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';
function Roster() {
    const [roster, setRoster] = useState([]);
    const [teamcolor, setTeamColor] = useState('');

    const { teamId } = useParams();

    const userData = JSON.parse(localStorage.getItem('user'));
    const user_id = userData?.user_id;

    const getRoster = async (teamId) => {
        try {
            const response = await axios.get(BASE_URL + `/api/teams/${teamId}/`);
            console.log(response.data)
            setRoster(response.data.players);
            setTeamColor(response.data.team_colors[0].hex_color)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRoster(teamId);
    }, []);



    const addToFav = (playerId) => {
        axios.post(BASE_URL + `/api/teams/${teamId}/${playerId}/${user_id}`, { playerId });
        navigate('/myplayers');
    }

    const navigate = useNavigate();

    return (
        <>
            <br />
            <img src={logos[`${teamId}`]} style={{ width: "150px" }} />
            <h2> Roster</h2>
            <br />
            {console.log(teamcolor)}
            <Container>
                {console.log(roster)}
                <Row className="justify-content-md-center">
                    {
                        roster?.map((player) => (
                            <Card style={{ width: '20%', marginRight:"1%", marginBottom:"2%" }} key={player.id} className="player-card">
                                <Card.Img variant="top" 
                                src={player?.reference ? 
                                `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.reference}.png` : anonymous} 
                                className="player-card-img"
                                style={{backgroundColor:`${teamcolor}`}}
                                />
                                <Card.Body className="player-card-body">
                                <Card.Title>
                                    {player.first_name} {player.last_name}
                                    <hr class="hr" />
                                </Card.Title>
                                
                                <Card.Text className="player-card-text">
                                    Draft: {player.draft.year}<br/>
                                    Pick: {player.draft.pick ? player.draft.pick : "undrafted"} <br/>
                                    <hr class="hr" />
                                    Position: {player.primary_position}<br />
                                    Height: {Math.floor(player.height/12)}-{player.height%12}<br />
                                    Weight: {player.weight}<br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor:`${teamcolor}10`}} className="player-card-footer">
                                <Button className="player-card-body" variant="outline-dark" onClick={() => {
                                    {
                                        user_id ?
                                            addToFav(player.id)
                                            : navigate('/login')
                                    }
                                }}>Add to favorite</Button>
                            </Card.Footer>
                            </Card>  
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Roster;