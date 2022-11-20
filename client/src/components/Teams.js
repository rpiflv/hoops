import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import '../App.css';
import logos from "../logos";



const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams(props) {

    const { teams, setTeams } = props;
    const [logoSrc, setLogoSrc] = useState('')

    const getAllTeams = async () => {
        try {
            const teams = await axios.get(BASE_URL + '/api/teams')
            setTeams(teams.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllTeams()
    }, [])

    const getLogoSrc = (id) => {
        const logo = logos.find(logo => logo.apiId = id)
        console.log(logo)
        // setLogoSrc(logo.src)
    }

    useEffect((id) => {
        getLogoSrc(id)
    }, [])

    return (
        <>

            <br />
            <ListGroup>
                <Container >
                    <Row className="justify-content-md-center">

                        <Col sm={4}>
                            <h3>West Conf.</h3>
                            {teams.map((team) => (
                                team.isNBAFranchise && team.confName === "West" &&
                                <ListGroup.Item key={team.teamId} className={"box"} >
                                    <div >

                                        <Link to={`${team.teamId}`}> {team.fullName}

                                            <img src={getLogoSrc(team.teamId)} />
                                        </Link>

                                    </div>
                                </ListGroup.Item>

                            ))}
                        </Col><Col sm={4}>
                            <h3>East Conf.</h3>
                            {teams.map((team) => (
                                team.isNBAFranchise && team.confName === "East" &&
                                <ListGroup.Item key={team.teamId} className={"box"} >
                                    <div >
                                        <Link to={`${team.teamId}`}> {team.fullName}</Link>
                                    </div>
                                </ListGroup.Item>

                            ))}
                        </Col>
                    </Row>
                </Container>
            </ListGroup>
        </>
    )
}

export default Teams;