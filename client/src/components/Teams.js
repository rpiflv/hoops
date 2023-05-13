import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../App.css';
import logos from "../logos"

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams() {
    // const [west, setWest] = useState([]);
    // const [east, setEast] = useState([]);

    const [conferences, setConferences] = useState([]);

    const getAllTeams = async () => {
        try {
            const standings = await axios.get(BASE_URL + '/api/teams')
            // setWest(conf.data.conferences[0]);
            // setEast(conf.data.conferences[1]);
            setConferences(standings.data.conferences)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAllTeams();
    }, [])

    return (
        <>
            <br />
            <Container >
                <h3>Standings</h3>
                {console.log(conferences)}
                <Row>
                    {conferences.map((conference) => (
                    <Col className="d-flex flex-column  align-items-top">
                        <div key={conference.id} >
                            <h2>{conference.name}</h2>
                            <div>
                            {conference.divisions.map((division) => (
                                <div key={division.id} className="d-flex flex-column">
                                    <h4>{division.name}</h4>
                                    <div className="align-self-center">
                                        {division.teams.map((team) => (
                                            <Link to={`${team.id}`} style={{textDecoration: "none"}}>
                                                <Card key={team.id} border="light" style={{height: "20%", width:"auto", padding:"8px"}} 
                                                className="team align-self-center">
                                                {team.market} {team.name} 
                                                <Card.Img src={`${logos[team.id]}`} variant="top" style={{ height: "10rem", width:"auto" }}></Card.Img>
                                                <div className="visibility" style={{color:"black"}}>
                                                    {team.wins} - {team.losses}<br/>
                                                    <Row>
                                                        <Col>
                                                            {team.records[8].record_type}: {team.records[8].wins}-{team.records[8].losses}
                                                        </Col>
                                                        <Col>
                                                            {team.records[22].record_type}: {team.records[22].wins}-{team.records[22].losses}
                                                        </Col>
                                                    </Row>
                                                    Streak: {team.streak.length} {team.streak.kind}
                                                </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    ))}
                    
                    {/* <Col>
                        <h3>Eastern Conference</h3>
                        <div className="d-flex flex-column">
                            {standings.map((standing, index) => (
                            standing.conference.name === "east" &&
                            <Card key={index} border="light" style={{height: "auto", width:"20rem", padding:"8px"}} className="team align-self-center">
                                <Link to={`${standing.team.id}`} style={{textDecoration: "none"}}>
                                <Card.Img src={standing.team.logo} variant="top" style={{ height: "5rem", width:"auto" }} />
                                <div className="visibility" style={{color:"black"}}>
                                        {standing.team.name}<br/>
                                        {standing.conference.win} - {standing.conference.loss}
                                    </div>
                                </Link>
                            </Card>
                            ))}
                        </div>
                    </Col> */}
                </Row>
            </Container>
        </>
    )
}

export default Teams;