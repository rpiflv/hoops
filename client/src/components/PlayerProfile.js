import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerProfile() {
    const [playerInfo, setPlayerInfo] = useState({})
    const [notes, setNotes] = useState('')

    const { playerId } = useParams();

    const getPlayerInfo = async (playerId) => {
        const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/`)
        console.log(fetchedData.data)

        const notes = fetchedData.data.notes
        const info = fetchedData.data.allPlayers.find(player => player.personId === playerId)
        setPlayerInfo(info)
        setNotes(notes)
    }

    useEffect(() => {
        getPlayerInfo(playerId)
    }, [])
    return (
        <>
            <h1>Player profile</h1>

            {playerInfo.firstName}<br />
            {playerInfo.lastName}<br />
            {playerInfo.pos}<br />
            #{playerInfo.jersey}<br />
            <input value={notes[0]} />
        </>
    )

}

export default PlayerProfile;