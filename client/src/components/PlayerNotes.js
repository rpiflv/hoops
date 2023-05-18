import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container, Card} from 'react-bootstrap/';
import '../App.css';
import authHeader from "../services/authheader";

const userData = JSON.parse(localStorage.getItem('user'));
const user_id = userData?.user_id;

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerNotes(props) {
    const {playerInfo} = props;
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    const getPlayerNotes = async (playerId) => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerInfo.id}/${user_id}`, { headers: authHeader() });
            setNotes(fetchedData.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getPlayerNotes(playerInfo.reference);
    }, []);

    const handleChange = (event) => {
        setNewNote(event.target.value);
      };

    const handleSubmit = async () => {
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerInfo.reference}/${user_id}/add`,
                { newNote: newNote }, { headers: authHeader() }
            )
            .then(clearInput())
            .then(getPlayerNotes(playerInfo.reference ))
        } catch (error) {
            console.error(error);
        }
    };

    const clearInput = () => {
        setNewNote("");
    }
    return (
        <>
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width:"70%"}}>
              Player notes
              <Card.Body>
                <Card.Title>
                    {notes?.notes[0]?.notes}
                </Card.Title>
                {notes?.extraNotes?.map(note => (
                    <div>
                        {note?.note_content}
                    </div>
                ))}
                <input type="text" value={newNote} onChange={handleChange}> 
                </input>
                <button onClick={() => {handleSubmit(); clearInput()}}>Submit</button>
              </Card.Body>
            </Card>
        </Container>
        </>
    )
};

export default PlayerNotes;