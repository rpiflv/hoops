import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import authHeader from "../services/authheader";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";



const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {

    const [myFavsInfo, setMyFavsInfo] = useState([])
    const [myFavsNotes, setMyFavsNotes] = useState([])
    const [myPlayerInfo, setMyPlayerInfo] = useState([])

    const userData = JSON.parse(localStorage.getItem('user'))
    const user_id = userData.user_id

    const navigate = useNavigate();

    const getMyFav = async () => {
        try {
            // const fetchedData = await axios.get(BASE_URL + '/api/myplayers', { headers: authHeader() })
            await axios.get(BASE_URL + `/api/myplayers/${user_id}`, { body: user_id, headers: authHeader() })
                .then((fetchedData) => {

                    const allPlayers = fetchedData.data.allPlayers;
                    const favsPlayersNotes = fetchedData.data.favPlayers;
                    const favPlayersID = fetchedData.data.favPlayers.map(id => id.playerId)
                    const favPlayersInfo = []
                    favPlayersID.map(id => favPlayersInfo.push(allPlayers.find(player => player.personId === id)))
                    setMyFavsInfo(favPlayersInfo)
                    setMyFavsNotes(favsPlayersNotes)
                    const allData = favPlayersInfo.map((pIn) => ({ ...pIn, ...favsPlayersNotes.find(plNt => plNt.playerId === pIn.personId) }))
                    setMyPlayerInfo(allData)
                },
                    (error) => {
                        if (error.response) {
                            authService.logout()
                            navigate('/login')
                            window.location.reload()
                        }
                    })
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getMyFav()
    }, [])

    async function removeFav(playerId) {
        try {
            await fetch(BASE_URL + `/api/myplayers/${playerId}`, {
                method: "DELETE",
                body: { playerId },
                headers: authHeader()
            })
                .then(getMyFav())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h2>My Favorite Players</h2>
            <Container>
                <Row >

                    {myPlayerInfo && myPlayerInfo.map((player) => (
                        <Card style={{ width: '18rem', marginBlockEnd: "10px", marginInline: "10px", marginBlockStart: "20px" }} key={player.personId}>
                            <Card.Img variant="top"
                                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} />
                            <ListGroup.Item >
                                <div  >
                                    <h3>{player.firstName} {player.lastName}</h3>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0" key={player.personId}>
                                        <Accordion.Header>Player Characteristics: </Accordion.Header>
                                        <Accordion.Body>
                                            {player.notes}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <br />
                                <Link to={`${player.personId}`} >
                                    <Button>Details</Button>
                                </Link>
                                <Button onClick={() => removeFav(player.personId)}>Remove</Button>
                            </ListGroup.Item>

                        </Card>
                    ))}


                </Row>
            </Container>

        </>
    )
}

export default Favorite;