import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import logos from "../logos";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Roster() {

    const [roster, setRoster] = useState([])
    const [teamName, setTeamName] = useState('')

    const { teamId } = useParams()

    const userData = JSON.parse(localStorage.getItem('user'))
    const user_id = userData?.user_id;

    // const getTeamsName = async (teamId) => {
    //     try {
    //         const teams = await axios.get(BASE_URL + '/api/teams')
    //         const team = teams.data.find(team => team.teamId === teamId)
    //         setTeamName(team.fullName)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    console.log(teamId)
    const getRoster = async (teamId) => {
        try {
            const data = await axios.get(BASE_URL + `/api/teams/${teamId}/`)
            console.log(data)
            setRoster(data.data.response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getRoster(teamId)
    }, [])

    // useEffect(() => {
    //     getTeamsName(teamId)
    // }, [])

    const addToFav = (playerId) => {
        axios.post(BASE_URL + `/api/teams/${teamId}/${playerId}/${user_id}`, { playerId })
        navigate('/myplayers')
    }

    const navigate = useNavigate();

    return (
        <>
            <br />
            <img src={logos[`${teamId}`]} style={{ width: "150px" }} />
            {/* <h2>{teamName}'s Roster</h2> */}
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    {roster.map((player, index) =>
                        <Card style={{ width: '20%' }} key={index}>
                            <Card.Img variant="top"
                                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt="**** no img *****" />
                            <Card.Body>
                                <Card.Title>
                                    {player.firstName} {player.lastName}
                                </Card.Title>
                                <Card.Text>
                                    Position: {player.leagues.standard.pos}<br />
                                    Height: {player.height.meters}<br />
                                    Weight: {player.weight.kilograms}<br />
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