import React, { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import '../App.css';



const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Teams(props) {

    const { teams, setTeams } = props;

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

    return (
        <>

            <br />
            <h2>Teams</h2>
            <ListGroup>
                <Container >
                    <Row className="justify-content-md-center">

                        <Col sm={4}>
                            {teams.map((team) => (
                                team.isNBAFranchise &&
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