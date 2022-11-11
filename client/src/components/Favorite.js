import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {

    const [myFavsInfo, setMyFavsInfo] = useState([])
    const [myFavsNotes, setMyFavsNotes] = useState([])
    const [myPlayerInfo, setMyPlayerInfo] = useState([])

    const getMyFav = async () => {
        const fetchedData = await axios.get(BASE_URL + '/api/myplayers')
        const allPlayers = fetchedData.data.allPlayers;
        const favsPlayersNotes = fetchedData.data.favPlayers;
        const favPlayersID = fetchedData.data.favPlayers.map(id => id.playerId)
        const favPlayersInfo = []
        favPlayersID.map(id => favPlayersInfo.push(allPlayers.find(player => player.personId === id)))
        setMyFavsInfo(favPlayersInfo)
        setMyFavsNotes(favsPlayersNotes)
        const allData = favPlayersInfo.map((pIn) => ({ ...pIn, ...favsPlayersNotes.find(plNt => plNt.playerId === pIn.personId) }))
        setMyPlayerInfo(allData)

    }

    useEffect(() => {
        getMyFav()
    }, [])

    return (
        <>
            <h2>My Favorite Players</h2>
            <ListGroup>
                {myPlayerInfo.map((player) => (
                    <Card style={{ width: '18rem' }}>
                        <ListGroup.Item >
                            <div key={player.personId} >
                                {player.firstName} {player.lastName}
                            </div>
                            <Accordion >
                                <Accordion.Item eventKey="0" key={player.personId}>
                                    <Accordion.Header>Notes</Accordion.Header>
                                    <Accordion.Body>
                                        {player.notes}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Link to={`${player.personId}`} >
                                <Button>Details</Button>
                            </Link>
                            <Button>Delete</Button>
                        </ListGroup.Item>
                        <br />
                    </Card>
                ))}

            </ListGroup>
        </>
    )
}

export default Favorite;