import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../App.css';
import logos from "../logos";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams() {

    const [conferences, setConferences] = useState([]);

    const getAllTeams = async () => {
        try {
            const standings = await axios.get(BASE_URL + '/api/teams');
            setConferences(standings.data.conferences);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllTeams();
    }, []);

    return (
        <>
            <br />
            <Container >
                <h3>Standings</h3>
                {console.log(conferences)}
                <Row>
                    {conferences.map((conference) => (
                    <Col className="d-flex flex-column align-items-top">
                        <div key={conference.id} >
                            <h2>{conference.name}</h2>
                            <div>
                            {conference.divisions.map((division) => (
                                <div key={division.id} className="d-flex flex-column">
                                    <h4>{division.name}</h4>
                                    <div className="align-self-center">
                                        {division.teams.map((team) => (
                                            <Link to={`${team.id}`} style={{textDecoration: "none"}}>
                                                <Card key={team.id} border="light" style={{height: "15%", width:"12rem", padding:"6px"}} 
                                                className="team align-self-center">
                                                {team.market} {team.name} 
                                                <Card.Img src={`${logos[team.id]}`} variant="top" style={{ height: "12rem", width:"auto" }}></Card.Img>
                                                <div className="visibility" style={{color:"black"}}>
                                                    <h5>{team.wins} - {team.losses}<br/></h5>
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
                </Row>
            </Container>
        </>
    )
};

export default Teams;