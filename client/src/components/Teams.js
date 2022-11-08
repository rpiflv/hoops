import React, { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";


import axios from "axios";

function Teams(props) {

    const { teams, setTeams } = props;

    const getAllTeams = async () => {
        const teams = await axios.get('http://localhost:5050/api/teams')
        // console.log(teams.data.league.standard)
        setTeams(teams.data)
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