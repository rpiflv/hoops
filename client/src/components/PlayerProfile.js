import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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

            {playerInfo.firstName}<br />
            {playerInfo.lastName}<br />
            {playerInfo.pos}<br />
            #{playerInfo.jersey}<br />
            <Form>
                <input value={notes} onChange={editNote} />
                <Button variant="primary" type="submit" onClick={sendNote} >
                    Edit
                </Button>
            </Form>
        </>
    )

}

export default PlayerProfile;