import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container, Card, Button, Form, Col, Row} from 'react-bootstrap/';
import '../App.css';
import authHeader from "../services/authheader";
import moment from "moment";

const userData = JSON.parse(localStorage.getItem('user'));
const user_id = userData?.user_id;

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerNotes(props) {
    const {playerInfo} = props;
    const [notes, setNotes] = useState("");
    const [extraNotes, setExtraNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showEditInput, setShowEditInput] = useState(false);

    const getPlayerNotes = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerInfo.id}/${user_id}`, { headers: authHeader() });
            setNotes(fetchedData.data.notes[0].notes);
            setExtraNotes(fetchedData.data.extraNotes);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getPlayerNotes(playerInfo.reference);
    }, []);

    const handleChangeExtraNote = (event) => {
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

    const removeExtraNote = async (noteId) => {
        try {
            await fetch(BASE_URL + `/api/myplayers/${playerInfo.reference}/${user_id}/delete/${noteId}`, {
                method: "DELETE",
                headers: authHeader()
            })
                .then(getPlayerNotes(playerInfo.reference));
        } catch (err) {
            console.log(err);
        }
    };

    const editNote = (e) => {
            setNotes(e.target.value);
    };

    const sendNote = async () => {
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerInfo.reference}/${user_id}/edit`,
                { notes }, { headers: authHeader() }
            ).then(() => getPlayerNotes(playerInfo.reference));

        } catch (error) {
            console.error(error);
        }
    };
    
    const clearInput = () => {
        setNewNote("");
    };

    const toggleEdit = () => {
        setShowEditInput(!showEditInput);
    }

    return (
        <>
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width:"70%"}} className="note-card">
              <div style={{padding:"1rem"}}>Player's profile</div>
                {/* <Card.Title style={{background:"white", padding:"1rem", borderRadius:"5px", marginLeft:"1rem", marginRight:"1rem"}} className="d-flex align-text-right note-title" onClick={toggleEdit}>
                    //  {notes} 
                </Card.Title> */}
                <Card.Body>
                    <Form className="mb-3" >
                        <Form.Control as="textarea" rows={2} value={notes} onChange={editNote} className="resizedTextbox" onClick={toggleEdit}/>
                     {showEditInput && 
                            <Button variant="outline-dark" onClick={() => {sendNote(); toggleEdit()}} style={{marginTop:"5px"}}>
                                 Save
                            </Button>             
                     }
                     </Form>
                     {/* {!showEditInput && 
                     <Button onClick={toggleEdit} variant="outline-dark" style={{marginTop:"5px"}}>
                        Edit
                     </Button>
                     } */}
                    <hr className="hr-card-note"/>
                    <div style={{padding:"1rem"}}>My Notes</div>
                    {extraNotes?.map(note => (
                    <div className="note-box">
                        <Row>
                            <Col md="2" style={{fontSize:"70%", fontWeight:"300", justifyContent:"center"}}> 
                                {moment(note?.created_at).format("MMMM Do [']YY") }
                            </Col>
                            <Col md="8" className="d-flex align-text-right" >
                                {note?.note_content}
                            </Col>
                            <Col md="2">
                                <Button variant="outline-secondary" size="sm" className="mb-50" onClick={() => removeExtraNote(note.id)} style={{verticalAlign:"top"}}>
                                x
                                </Button>
                            </Col>
                        </Row>
                        <hr/>
                    </div>
                    ))}
                    <div className="d-flex align-text-right">New note</div>
                <Form>
                    <Form.Control as="textarea" rows="2" value={newNote} onChange={handleChangeExtraNote}/>
                </Form>
                    <Button onClick={() => {handleSubmit(); clearInput()}} variant="outline-dark" style={{marginTop:"5px"}}>Submit</Button>
              </Card.Body>
            </Card>
        </Container>
        </>
    )
};

export default PlayerNotes;