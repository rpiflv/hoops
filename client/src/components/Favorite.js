import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Favorite() {
    const [myFavs, setMyFavs] = useState([])

    const getMyFav = async () => {

    }
    return (
        <>
            <h2>My Favorite Players</h2>
        </>
    )
}

export default Favorite;