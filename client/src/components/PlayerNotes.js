import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {Container, Card, Stack, Row, Col} from 'react-bootstrap/';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';
import authHeader from "../services/authheader";

const userData = JSON.parse(localStorage.getItem('user'));
const user_id = userData?.user_id;

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerNotes(props) {
    const {playerInfo} = props;
    const [notes, setNotes] = useState('');
    const {playerId} = useParams();

    const getPlayerNotes = async (playerId) => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
            // const notes = fetchedData.data.notes
            console.log(fetchedData);
            // setNotes(notes[0].notes);
            setNotes(fetchedData.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPlayerNotes(playerId);
    }, []);

    return (
        <>
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width:"70%"}}>
              Player notes
            </Card>
            {console.log(playerInfo)}        
        </Container>
        </>
    )
};

export default PlayerNotes;