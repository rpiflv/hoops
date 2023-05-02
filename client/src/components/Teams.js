import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../App.css';


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams(props) {
    // const { teams, setTeams } = props;
    const [standings, setStandings] = useState([])
    const getAllTeams = async () => {
        try {
            const teams = await axios.get(BASE_URL + '/api/teams')
            // console.log(teams)
            setStandings(teams.data.response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllTeams()
        console.log(standings)
    }, [])

    return (
        <>
            <br />

            <Container >
                <h3>Teams</h3>
                <Row >
                    <Col >
                        <h3>Western Conference</h3>
                        <div className="d-flex flex-column">
                        {standings.map((standing) => (
                            standing.conference.name === "west" &&
                            <Card key={standing.team.id} border="light" style={{height: "auto", width:"20rem", padding:"8px"}} className="team align-self-center">
                                <Link to={`${standing.team.id}`} style={{textDecoration: "none"}}>
                                    <Card.Img src={standing.team.logo} variant="top" style={{ height: "5rem", width:"auto" }} />
                                    <div className="visibility" style={{color:"black"}}>
                                        {standing.team.name} <br/>
                                        {standing.conference.win} - {standing.conference.loss}
                                    </div>
                                </Link>

                            </Card>
                        ))}
                        </div>
                    </Col>
                    <Col>
                        <h3>Eastern Conference</h3>
                        <div className="d-flex flex-column">
                        {standings.map((standing) => (
                            standing.conference.name === "east" &&
                            <Card border="light" style={{height: "auto", width:"20rem", padding:"8px"}} className="team align-self-center">

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
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teams;