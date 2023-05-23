import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import authHeader from "../services/authheader";
import anonymous from "../anonymous.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';
function Roster(props) {
    const {roster, teamcolor, teamcolorSec} = props;
    const { teamId } = useParams();
    const [favPlayers, setFavPlayers] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const user_id = userData?.user_id;
    const navigate = useNavigate();

    const addToFav = (playerId, reference) => {
        axios.post(BASE_URL + `/api/teams/${teamId}/${playerId}/${user_id}`, {reference});
        navigate('/myplayers');
    }

    useEffect(() => {
        const checkFavPlayers = async () => {
            try {
                const favList = await axios.get(BASE_URL + `/api/myplayers/${user_id}`, { body: user_id, headers: authHeader() });
                    const refList = favList?.data.favPlayers.map(player => player.reference);
                    setFavPlayers(refList);
            } catch(err) {
                console.log(err);
            }
        };
        if (user_id) {
            checkFavPlayers();
        }
    }, [])


    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    {
                        roster?.map((player) => (
                            <Card style={{height:"100%", width: '15rem', marginRight:"1%", marginBottom:"2%", padding:"0", backgroundColor:`${teamcolor}10` }} key={player.id} 
                            className="player-card" border="light">
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                {favPlayers.indexOf(player.id) >= 0 && 
                                <FontAwesomeIcon icon={faHeart} color={teamcolorSec} style={{ position: 'absolute', top: "5%", right: "5%" }
                            }/>
                        }
                                <Card.Img variant="top" 
                                src={player?.reference ? 
                                    `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.reference}.png` : anonymous} 
                                    className="player-card-img"
                                    style={{backgroundColor:`${teamcolor}`, zIndex:"9998"}}
                                    />
                                    </div>
                                <Card.Body className="player-card-body" style={{backgroundColor:`${teamcolorSec}10`}}>
                                <Card.Title>
                                    {player?.first_name} {player?.last_name} 
                                </Card.Title>
                                    <hr/>
                                
                                <Card.Text className="player-card-text">
                                    Draft: {player?.draft.year}<br/>
                                    Pick: {player?.draft.pick ? player?.draft.pick : "undrafted"} <br/>
                                </Card.Text>
                                <Card.Text className="player-card-text">
                                    Position: {player?.primary_position}<br />
                                    Height: {Math.floor(player?.height/12)}-{player?.height%12}<br />
                                    Weight: {player?.weight}<br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor:`${teamcolorSec}50`}} className="player-card-footer">
                                <Button className="player-card-footer" style={{backgroundColor:`${teamcolorSec}`}} variant="outline-dark" onClick={() => {
                                    {
                                        user_id ?
                                            addToFav(player?.reference, player?.id)
                                            : navigate('/login')
                                    }
                                }}>Add to favorite</Button>
                                <Button className="player-card-footer" style={{backgroundColor:`${teamcolorSec}`, marginLeft:"5%"}} variant="outline-dark" onClick={() => navigate(`/${player.id}`)}>
                                    Details
                                </Button>
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