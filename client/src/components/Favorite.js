import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import authHeader from "../services/authheader";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faQrcode } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {

    const [myFavsInfo, setMyFavsInfo] = useState([]);
    const [myFavsNotes, setMyFavsNotes] = useState([]);
    const [myPlayerInfo, setMyPlayerInfo] = useState([]);

    const userData = JSON.parse(localStorage.getItem('user'));
    const user_id = userData.user_id;

    const navigate = useNavigate();

    const getMyFav = async () => {
        try {
            await axios.get(BASE_URL + `/api/myplayers/${user_id}`, { body: user_id, headers: authHeader() })
                .then((fetchedData) => {
                    setMyPlayerInfo(fetchedData.data.favPlayers);
                },
                    (error) => {
                        if (error.response) {
                            authService.logout();
                            navigate('/login');
                            window.location.reload();
                        }
                    })
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getMyFav();
    }, []);

    const removeFav = async (reference) => {
        try {
            await fetch(BASE_URL + `/api/myplayers/${reference}`, {
                method: "DELETE",
                body: { reference },
                headers: authHeader(),
            })
                .then(getMyFav());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h2>My Favorite Players</h2>
            <hr/>
            <Container>
                <Row >
                    {myPlayerInfo && myPlayerInfo.map((player, index) => (
                        <Card style={{ width: '18rem', marginBlockEnd: "10px", marginInline: "10px", marginBlockStart: "20px" }} 
                        key={index} className="fav-box">
                            <Card.Img variant="top"
                                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.playerId}.png`} />
                            <ListGroup.Item >
                                <div  style={{paddingBlock:"1rem"}}>
                                    <h3>{player.full_name}</h3>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0" key={player.personId}>
                                        <Accordion.Header>Player's profile: </Accordion.Header>
                                        <Accordion.Body>
                                            {player.notes}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <div className="d-flex" style={{justifyContent:"space-evenly", marginBlock:"1rem"}}>
                                <Link to={`${player.reference}`} >
                                    <Button variant="outline-secondary">
                                    <FontAwesomeIcon icon={faQrcode}/>
                                    </Button>
                                </Link>
                                <Button variant="outline-danger" onClick={() => removeFav(player.reference)}>
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </Button>
                                </div>
                            </ListGroup.Item>
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Favorite;