import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import authHeader from "../services/authheader";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerProfile() {
    const [playerInfo, setPlayerInfo] = useState({});
    const [notes, setNotes] = useState('');
    const [extraNotes, setExtraNotes] = useState([])
    const [extraNote, setExtraNote] = useState('')

    const userData = JSON.parse(localStorage.getItem('user'))
    const user_id = userData.user_id

    const { playerId } = useParams();

    const getPlayerInfo = async (playerId) => {
        try {

            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
            const info = fetchedData.data.allPlayers.find(player => player.personId === playerId)
            setPlayerInfo(info)
        } catch (error) {
            console.error(error)
        }
    }

    const getPlayerNotes = async (playerId) => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
            const notes = fetchedData.data.notes
            setNotes(notes[0].notes)
        } catch (error) {
            console.error(error)
        }
    }

    const getPlayerExtraNotes = async (playerId) => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
            // console.log("extra notes:", fetchedData.data.extraNotes)
            setExtraNotes(fetchedData.data.extraNotes)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPlayerInfo(playerId)
    }, [])

    useEffect(() => {
        getPlayerNotes(playerId)
    }, [])

    useEffect(() => {
        getPlayerExtraNotes(playerId)
    }, [])

    const editNote = (e) => {
        setNotes(e.target.value)
    }
    const sendNote = async () => {
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerId}/${user_id}/edit`,
                { notes }, { headers: authHeader() }
            )
        } catch (error) {
            console.error(error)
        }
    }

    const editExtraNote = (e) => {
        setExtraNote(e.target.value)
    }
    const sendExtraNote = async () => {
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerId}/${user_id}/add`,
                { extraNote }, { headers: authHeader() }
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>Player's profile</h1>
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
                        <h4>Description:</h4>
                        <Form className="mb-3">
                            <Form.Control value={notes} onChange={editNote} className="resizedTextbox" />
                            <Button variant="primary" onClick={sendNote} >
                                Edit
                            </Button>
                        </Form>
                        <h4>Extra notes</h4>
                        {extraNotes.map(note =>
                            <p>
                                {note.note_content}
                            </p>
                        )}

                        <Form className="mb-3">
                            <Form.Control value={extraNote} onChange={editExtraNote} className="resizedTextbox" />
                            <Button variant="primary" onClick={sendExtraNote} >
                                Add
                            </Button>
                        </Form>
                    </Card>

                </Row>
            </Container>
        </>
    )

}

export default PlayerProfile;