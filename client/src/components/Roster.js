import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Roster() {
    const [roster, setRoster] = useState([])

    const { teamId } = useParams()

    const getRoster = async (teamId) => {
        const data = await axios.get(BASE_URL + `/api/teams/${teamId}/`)
        let players = data.data.league.standard
        const filteredPlayers = players.filter(player => player.teamId === teamId)
        console.log(filteredPlayers)
        setRoster(filteredPlayers)
    }

    useEffect(() => {
        getRoster(teamId)
    }, [])

    const addToFav = (playerId) => {
        axios.post(BASE_URL + `/api/teams/${teamId}/${playerId}`, { playerId })
    }

    return (
        <>
            {roster.map(player =>
                <Card style={{ width: '20%' }}>

                    <Card.Body>
                        <Card.Title>
                            {player.firstName} {player.lastName}
                        </Card.Title>
                        <Card.Text>
                            <p>Position: {player.teamSitesOnly.posFull}</p>
                            <p>Height: {player.heightFeet}-{player.heightInches}</p>
                            <p>Weight: {player.weightPounds}</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer >
                        <Button onClick={() => {
                            console.log(player.personId)
                            addToFav(player.personId)
                        }}>Add to favorite</Button>
                    </Card.Footer>
                </Card>
            )}
        </>
    )

}

export default Roster;