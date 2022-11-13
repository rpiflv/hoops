import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerProfile() {
    const [playerInfo, setPlayerInfo] = useState({});
    const [notes, setNotes] = useState('');

    const { playerId } = useParams();

    const getPlayerInfo = async (playerId) => {
        try {

            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/`)
            const info = fetchedData.data.allPlayers.find(player => player.personId === playerId)
            setPlayerInfo(info)
        } catch (error) {
            console.error(error)
        }
    }

    const getPlayerNotes = async (playerId) => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/`)
            const notes = fetchedData.data.notes
            setNotes(notes[0].notes)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPlayerInfo(playerId)
    }, [])

    useEffect(() => {
        getPlayerNotes(playerId)
    }, [])

    const editNote = (e) => {
        setNotes(e.target.value)
    }
    const sendNote = async () => {
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerId}/edit`,
                { notes }
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Player profile</h1>
            <Container>
                <Row className="justify-content-md-center">

                    <Card style={{ width: '30rem' }} key={playerInfo.personId}>

                        <Card.Img variant="top"
                            src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerInfo.personId}.png`} width={"20%"} />
                        <h3>{playerInfo.firstName}<br />
                            {playerInfo.lastName}<br />
                        </h3>
                        <h4>Position: {playerInfo.pos}<br /></h4>
                        <h2>#{playerInfo.jersey}<br /></h2>
                        <br />
                        <h4>Notes:</h4>
                        <Form className="mb-3">
                            <input value={notes} onChange={editNote} class="resizedTextbox" />
                            <Button variant="primary" onClick={sendNote} >
                                Edit
                            </Button>
                        </Form>
                    </Card>

                </Row>
            </Container>
        </>
    )

}

export default PlayerProfile;