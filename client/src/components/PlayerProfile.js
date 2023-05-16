import axios from "axios";
import logos from "../logos";
import '../App.css';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Nav, Row, ListGroup } from "react-bootstrap";
import authHeader from "../services/authheader";
import moment from 'moment';
import PlayerInfo from "./PlayerInfo";
import PlayerStats from "./PlayerStats";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

// function PlayerProfile() {
//     const [playerInfo, setPlayerInfo] = useState({});
//     const [notes, setNotes] = useState('');
//     const [extraNotes, setExtraNotes] = useState([])
//     const [extraNote, setExtraNote] = useState('')

//     const userData = JSON.parse(localStorage.getItem('user'))
//     const user_id = userData.user_id

//     const { playerId } = useParams();

//     const getPlayerInfo = async (playerId) => {
//         try {

//             const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
//             const info = fetchedData.data.allPlayers.find(player => player.personId === playerId)
//             setPlayerInfo(info)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const getPlayerNotes = async (playerId) => {
//         try {
//             const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
//             const notes = fetchedData.data.notes
//             setNotes(notes[0].notes)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const getPlayerExtraNotes = async (playerId) => {
//         try {
//             const fetchedData = await axios.get(BASE_URL + `/api/myplayers/${playerId}/${user_id}`, { headers: authHeader() })
//             // console.log("extra notes:", fetchedData.data.extraNotes)
//             setExtraNotes(fetchedData.data.extraNotes)
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getPlayerInfo(playerId)
//     }, [])

//     useEffect(() => {
//         getPlayerNotes(playerId)
//     }, [])

//     useEffect(() => {
//         getPlayerExtraNotes(playerId)
//     }, [])

//     const editNote = (e) => {
//         setNotes(e.target.value)
//     }
//     const sendNote = async () => {
//         try {
//             await axios.post(BASE_URL + `/api/myplayers/${playerId}/${user_id}/edit`,
//                 { notes }, { headers: authHeader() }
//             ).then(() => getPlayerExtraNotes(playerId))

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const editExtraNote = (e) => {
//         setExtraNote(e.target.value)
//     }

//     const sendExtraNote = async () => {
//         try {
//             await axios.post(BASE_URL + `/api/myplayers/${playerId}/${user_id}/add`,
//                 { extraNote }, { headers: authHeader() }
//             )
//                 .then(getPlayerExtraNotes(playerId))

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const clearInput = () => {
//         setExtraNote('')
//     }

//     const removeNote = async (noteId) => {
//         try {
//             await fetch(BASE_URL + `/api/myplayers/${playerId}/${user_id}/delete/${noteId}`, {
//                 method: "DELETE",

//                 headers: authHeader()
//             })
//                 .then(getPlayerExtraNotes(playerId))
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     return (
//         <>
//             <h1>Player's profile</h1>
//             <Container>
//                 <Row className="justify-content-md-center">

//                     <Card style={{ width: '30rem' }} key={playerInfo.personId}>

//                         <Card.Img variant="top"
//                             src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerInfo.personId}.png`} width={"20%"} />
//                         <h3>{playerInfo.firstName}<br />
//                             {playerInfo.lastName}<br />
//                         </h3>
//                         <h4>Position: {playerInfo.pos}<br /></h4>
//                         <h2>#{playerInfo.jersey}<br /></h2>
//                         <br />
//                         <h4>Player Characteristics:</h4>
//                         <Form className="mb-3">
//                             <Form.Control value={notes} onChange={editNote} className="resizedTextbox" />
//                             <Button variant="primary" onClick={sendNote} >
//                                 Save
//                             </Button>
//                         </Form>
//                         <br />
//                         <h4>Extra notes</h4>
//                         {extraNotes && extraNotes.map(note =>
//                             <ListGroup variant="flush">
//                                 <ListGroup.Item key={note.id}>
//                                     <small>{moment(note.created_at).format('MMMM Do YYYY, h:mm:ss a')}</small><br />
//                                     <h6>{note.note_content}</h6>
//                                     <Button variant="secondary" size="sm" className="mb-50" onClick={() => removeNote(note.id)}>
//                                         X
//                                     </Button>
//                                 </ListGroup.Item>
//                             </ListGroup>

//                         )}
//                         <br />
//                         <Form className="mb-3">
//                             <Form.Control value={extraNote} onChange={editExtraNote} className="resizedTextbox" />
//                             <Button variant="primary" onClick={() => { sendExtraNote(); clearInput() }} >
//                                 Add
//                             </Button>
//                         </Form>
//                     </Card>

//                 </Row>
//             </Container>
//         </>
//     )

// }

function PlayerProfile() {
    const [playerInfo, setPlayerInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('playerInfo')
    const { playerId } = useParams();

    useEffect(() => {
        const getPlayerInfo = async (playerId) => {
            try {
                const response = await axios.get(BASE_URL + `/api/${playerId}/`);
                setPlayerInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getPlayerInfo(playerId);
    }, []);

    const handleSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container>
            <Card className="border-light player-box">
                <Card.Header>
                    <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className="custom-nav-pills">
                        <Nav.Item>
                            <Nav.Link eventKey="playerInfo">
                            Details
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="playerStats">
                            Stats
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Title>
                <Card.Img src={logos[`${playerInfo?.team?.id}`]} style={{ width: "150px", marginBottom:"1%" , marginTop:"3%"}} alt="logo"/>
                <h4>{playerInfo.full_name}</h4>
                </Card.Title>
                <Card.Body>
                {activeTab === "playerInfo" && 
                <PlayerInfo playerInfo={playerInfo}/>
                }
                {activeTab === "playerStats" && 
                <PlayerStats playerInfo={playerInfo}/>
                }
                </Card.Body>


            </Card>
        </Container>
    )
}

export default PlayerProfile;