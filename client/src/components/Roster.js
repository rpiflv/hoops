import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Roster() {
    const [roster, setRoster] = useState([])

    const { teamId } = useParams()

    const userData = JSON.parse(localStorage.getItem('user'))
    const user_id = userData?.user_id;


    const getRoster = async (teamId) => {
        try {
            const data = await axios.get(BASE_URL + `/api/teams/${teamId}/`)
            let players = data.data.league.standard
            const filteredPlayers = players.filter(player => player.teamId === teamId)
            setRoster(filteredPlayers)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getRoster(teamId)
    }, [])

    const addToFav = (playerId) => {
        axios.post(BASE_URL + `/api/teams/${teamId}/${playerId}/${user_id}`, { playerId })
        navigate('/myplayers')
    }

    const navigate = useNavigate();

    return (
        <>
            <h2>Roster</h2>
            <Container>
                <Row className="justify-content-md-center">

                    {roster.map(player =>
                        <Card style={{ width: '20%' }}>
                            <Card.Img variant="top"
                                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt="**** no img *****" />
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
                                    {
                                        user_id ?
                                            addToFav(player.personId)
                                            : navigate('/login')
                                    }
                                }}>Add to favorite</Button>
                            </Card.Footer>
                        </Card>
                    )}

                </Row>
            </Container>
        </>
    )

}

export default Roster;