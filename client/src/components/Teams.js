import React, { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";


import axios from "axios";
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
            <h2>Teams</h2>
            <ListGroup>
                {teams.map((team) => (

                    <ListGroup.Item key={team.teamId} >
                        <div >
                            <Link to={`${team.teamId}`} > {team.fullName}</Link>
                        </div>
                    </ListGroup.Item>

                ))}

            </ListGroup>
        </>
    )
}

export default Teams;