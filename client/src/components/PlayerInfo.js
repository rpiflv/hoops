import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerInfo(props) {
    const playerInfo = props;
    const {playerId} = useParams();

    return (
        <>
        player info
        </>
    )
};

export default PlayerInfo;