import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from "react-bootstrap";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {

    const [myFavs, setMyFavs] = useState([])

    const getMyFav = async () => {
        const fetchedData = await axios.get(BASE_URL + '/api/myplayers')
        const allPlayers = fetchedData.data.allPlayers
        const favPlayersID = fetchedData.data.favPlayers.map(id => id.playerId)
        const favs = []
        favPlayersID.map(id => favs.push(allPlayers.find(player => player.personId === id)))
        setMyFavs(favs)
    }

    useEffect(() => {
        getMyFav()
    }, [])

    return (
        <>
            <h2>My Favorite Players</h2>
            <ListGroup>
                {myFavs.map((player) => (
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
                        </ListGroup.Item>
                        <br />
                    </Card>
                ))}

            </ListGroup>
        </>
    )
}

export default Favorite;