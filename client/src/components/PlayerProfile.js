import axios from "axios";
import logos from "../logos";
import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Nav } from "react-bootstrap";
import PlayerInfo from "./PlayerInfo";
import PlayerStats from "./PlayerStats";
import PlayerNotes from "./PlayerNotes";
import authHeader from "../services/authheader";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

const userData = JSON.parse(localStorage.getItem('user'));
const user_id = userData?.user_id;

function PlayerProfile() {
    const [playerInfo, setPlayerInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('playerInfo');
    const [isFav, setIsFav] = useState(false);
    const { playerId } = useParams();

    useEffect(() => {
        const getPlayerInfo = async (playerId) => {
            try {
                const response = await axios.get(BASE_URL + `/api/${playerId}/`);
                setPlayerInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getPlayerInfo(playerId);
    }, []);

    const handleSelect = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const checkFavPlayers = async () => {
            try {
                const favList = await axios.get(BASE_URL + `/api/myplayers/${user_id}`, { body: user_id, headers: authHeader() });
                    const ref = favList?.data.favPlayers.map(player => player.reference);
                    ref.indexOf(playerId) >= 0 && setIsFav(true);
            } catch(err) {
                console.log(err);
            }
        };
        if (user_id) {
            checkFavPlayers();
        }
    }, [])

    return (
        <Container>
            <Card className="border-light player-box">
                <Card.Header>
                    <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className="custom-nav-pills">
                        <Nav.Item>
                            <Nav.Link eventKey="playerInfo">
                            Details
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="playerStats">
                            Stats
                            </Nav.Link>
                        </Nav.Item>
                        {isFav && 
                        <Nav.Item>
                            <Nav.Link eventKey="notes">
                            Notes
                            </Nav.Link>
                    </Nav.Item>
                        }
                    </Nav>
                </Card.Header>
                <Card.Title>
                <Card.Img src={logos[`${playerInfo?.team?.id}`]} style={{ width: "150px", marginBottom:"1%" , marginTop:"3%"}} alt="logo"/>
                <h4>{playerInfo.full_name}</h4>
                </Card.Title>
                <Card.Body>
                {activeTab === "playerInfo" && 
                <PlayerInfo playerInfo={playerInfo}/>
                }
                {activeTab === "playerStats" && 
                <PlayerStats playerInfo={playerInfo}/>
                }
                {activeTab === "notes" && 
                <PlayerNotes playerInfo={playerInfo} isFav={isFav}/>
                }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PlayerProfile;