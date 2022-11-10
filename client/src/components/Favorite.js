import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {

    const [myFavs, setMyFavs] = useState([])

    const getMyFav = async () => {
        const fetchedData = await axios.get(BASE_URL + '/api/myplayers')
        const allPlayers = fetchedData.data.allPlayers
        const favPlayersID = fetchedData.data.favPlayers.map(id => id.playerId)
        const favs = []
        favPlayersID.map(id => favs.push(allPlayers.find(player => player.personId === id)))
        setMyFavs(favs)
    }

    useEffect(() => {
        getMyFav()
    }, [])

    return (
        <>
            <h2>My Favorite Players</h2>
            <ListGroup>
                {myFavs.map((player) => (

                    <ListGroup.Item >
                        <div key={player.personId}>
                            {player.firstName} {player.lastName}
                        </div>
                    </ListGroup.Item>

                ))}

            </ListGroup>
        </>
    )
}

export default Favorite;