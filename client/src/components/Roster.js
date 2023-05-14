import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';
function Roster() {
    const [roster, setRoster] = useState([]);
    const [teamcolor, setTeamColor] = useState('');
    const [teamcolorSec, setTeamColorSec] = useState('');

    const { teamId } = useParams();

    const userData = JSON.parse(localStorage.getItem('user'));
    const user_id = userData?.user_id;

    const getRoster = async (teamId) => {
        try {
            const response = await axios.get(BASE_URL + `/api/teams/${teamId}/`);
            console.log(response.data)
            setRoster(response.data.players);
            setTeamColor(response.data.team_colors[0].hex_color);
            setTeamColorSec(response.data.team_colors[1].hex_color);

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
            
            
            <Container>
                {console.log(roster)}

                <Row className="justify-content-center">
                    {
                        roster?.map((player) => (
                            <Card style={{height:"100%", width: '15rem', marginRight:"1%", marginBottom:"2%", padding:"0", backgroundColor:`${teamcolor}10` }} key={player.id} 
                            className="player-card" border="light">
                                <Card.Img variant="top" 
                                src={player?.reference ? 
                                `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.reference}.png` : anonymous} 
                                className="player-card-img"
                                style={{backgroundColor:`${teamcolor}`}}
                                />
                                <Card.Body className="player-card-body" style={{backgroundColor:`${teamcolorSec}10`}}>
                                <Card.Title>
                                    {player?.first_name} {player?.last_name}
                                    <hr className="hr" />
                                </Card.Title>
                                
                                <Card.Text className="player-card-text">
                                    Draft: {player?.draft.year}<br/>
                                    Pick: {player?.draft.pick ? player?.draft.pick : "undrafted"} <br/>
                                    <hr className="hr" />
                                    Position: {player?.primary_position}<br />
                                    Height: {Math.floor(player?.height/12)}-{player?.height%12}<br />
                                    Weight: {player?.weight}<br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor:`${teamcolorSec}50`}} className="player-card-footer">
                                <Button className="player-card-footer" style={{backgroundColor:`${teamcolorSec}`}} variant="outline-dark" onClick={() => {
                                    {
                                        user_id ?
                                            addToFav(player?.id)
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