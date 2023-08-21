import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container, Card, Button, Form, Col, Row} from 'react-bootstrap/';
import '../App.css';
import authHeader from "../services/authheader";
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

const userData = JSON.parse(localStorage.getItem('user'));
const user_id = userData?.user_id;

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerNotes(props) {
    const {playerInfo} = props;
    const [notes, setNotes] = useState("");
    const [extraNotes, setExtraNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showEditInput, setShowEditInput] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPlayerAllNotes(playerInfo.reference);
        loading && setLoading(false);
    }, [loading]);

    const getPlayerAllNotes = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerInfo.id}/${user_id}`, { headers: authHeader() });
            setNotes(fetchedData.data.notes[0].notes);
            setExtraNotes(fetchedData.data.extraNotes);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } 
    };

    const handleChangeExtraNote = (event) => {
        setNewNote(event.target.value);
      };

    const handleSubmitExtraNote = async () => {
        !loading && setLoading(true);
        try {
            await axios.post(BASE_URL + `/api/myplayers/${playerInfo.reference}/${user_id}/add`,
                { newNote: newNote }, { headers: authHeader() }
            )
            getPlayerAllNotes(playerInfo.reference);
            clearInput();
        } catch (error) {
            console.error(error);
        }
    };

    const removeExtraNote = async (noteId) => {
        try {
            !loading && setLoading(true);
            await fetch(BASE_URL + `/api/myplayers/${playerInfo.reference}/${user_id}/delete/${noteId}`, {
                method: "DELETE",
                headers: authHeader()
            })
            getPlayerAllNotes(playerInfo.reference);
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
            )
            getPlayerAllNotes(playerInfo.reference);
        } catch (error) {
            console.error(error);
        }
    };
    
    const clearInput = () => {
        setNewNote("");
    };

    const toggleEditOn = () => {
        setShowEditInput(true);
    };

    const toggleEditOff = () => {
        setShowEditInput(false);
    };

    return (
        <>
        <Container className='d-flex justify-content-center'>
            <Card style={{width:"70%"}} className="note-card">
                <Card.Body>
              <div style={{padding:"1rem", paddingBottom:"0rem"}}>Player's profile</div>
                            <hr/>
                    <Row style={{padding:"0"}}>
                        <Col md={11}> 
                            <Form className="mb-3" >
                                <Form.Control data-testid="player-profile-note" as="textarea" rows={2} value={notes} onChange={editNote} className="resizedTextbox" onClick={toggleEditOn}/>
                            </Form>
                        </Col>
                        <Col md={1}>
                            {showEditInput && 
                                    <Button className="btn-sm" variant="outline-secondary" onClick={() => {sendNote(); toggleEditOff()}} style={{marginTop:"5px"}}>
                                        <FontAwesomeIcon icon={faBoxArchive}/>
                                    </Button>             
                            }
                        </Col>
                     </Row>
                    <div style={{padding:"1rem", paddingBottom:"0rem"}}>My Notes</div>
                    <hr/>
                    {loading ? (
                        <p>Loading....</p>
                    ) : (extraNotes?.map(note => (
                    <div className="note-box" key={note.id}>
                        <Row>
                            <Col md="2" style={{fontSize:"80%", fontWeight:"300", justifyContent:"center", marginBottom:"3%"}}> 
                                {moment(note?.created_at).format("DD MMMM [']YY hh:mm a") }

                            </Col>
                            <Col md="9" className="d-flex align-text-right" >
                                {note?.note_content}
                            </Col>
                            <Col md="1" style={{marginRight:"0"}}>
                                <Button variant="outline-secondary" size="sm" className="mb-100" onClick={() => removeExtraNote(note.id)} 
                                style={{verticalAlign:"top", marginRight:"0"}}>
                                <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    ))) }
                    <div className="d-flex align-text-right" style={{fontWeight:"400"}}>New note</div>
                    <Row style={{padding:"0"}}>
                        <Col md={11}>
                        <Form>
                            <Form.Control as="textarea" rows="2" value={newNote} onChange={handleChangeExtraNote}/>
                        </Form>
                        </Col>
                        <Col md={1}>
                        <Button onClick={handleSubmitExtraNote} variant="outline-secondary" style={{marginTop:"5px"}} className="btn-sm">
                            <FontAwesomeIcon icon={faBoxArchive}/>
                        </Button>
                        </Col>
                    </Row>
              </Card.Body>
            </Card>
        </Container>
        </>
    )
};

export default PlayerNotes;