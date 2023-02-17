import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import '../App.css';


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams(props) {
    const { teams, setTeams } = props;
    const [standings, setStandings] = useState([])
    const getAllTeams = async () => {
        try {
            const teams = await axios.get(BASE_URL + '/api/teams')
            console.log(teams)
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
            {console.log(standings)}
            <Container className="justify-content-md-center">
                <h3>Standings</h3>
                <Row className="justify-content-md-center">
                    {/* <Container style={{ width: "75%",  }}> */}
                    <Col >
                        <h3>Western Conference</h3>
                        {standings.map((standing) => (
                            standing.conference.name === "west" &&
                            <Container className="text-center">
                                <Link to={`${standing.team.id}`}>
                                    <img src={standing.team.logo} className={"auto"} style={{ width: "50px" }} />
                                    <div>
                                        {/* <Typography > */}
                                        {standing.team.name}
                                        {/* </Typography> */}
                                    </div>
                                </Link>

                            </Container>
                        ))}
                    </Col>
                    <Col>
                        <h3>Eastern Conference</h3>
                        {standings.map((standing) => (
                            standing.conference.name === "east" &&

                            <Container className="text-center">
                                <Link to={`${standing.team.id}`}>

                                    <img src={standing.team.logo} className={"auto"} style={{ width: "50px" }} />
                                    <div>
                                        {standing.team.name}
                                    </div>
                                </Link>

                            </Container>
                        ))}

                    </Col>
                    {/* </Container> */}
                </Row>
            </Container>
            {/* </ListGroup> */}
        </>
    )
}

export default Teams;