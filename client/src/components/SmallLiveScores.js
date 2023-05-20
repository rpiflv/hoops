import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Button, CloseButton} from "react-bootstrap";
import '../App.css';
import { Grid } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function SmallLiveScores ({onHeightChange, toggleLive}) {

    const ref = useRef();

    const [todaysMatches, setTodaysMatches] = useState([]);
    const [isBlurry, setIsBlurry] = useState(false);

    const getMatches = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setTodaysMatches(fetchedData.data[1].scoreboard.games);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.clientHeight;
            onHeightChange(height / 8);
        }
    }, [onHeightChange]);

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY;
            const height = ref.current.clientHeight;
            if (scrollY > height / 2) {
                setIsBlurry(true);
            } else {
                setIsBlurry(false);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.clientHeight;
            onHeightChange(0);
        }
    }, [todaysMatches?.length]);

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <>

        <Container className={`d-grid live-container-small ${isBlurry ? 'blur' : ''}`} ref={ref} style={{width:"10%", opacity:"0.7", justifyItems:"end"}}>
            <div style={{display:"grid", gridTemplateColumns: "auto auto", justifyContent:"space-between"}}>
                <Button style={{justifySelf:"end", borderRadius:"50%"}} variant="outline-light" onClick={() => {toggleLive(); onHeightChange()}}>➕</Button>
            </div>
                <Row className="justify-content-center">
                    <div className="col-md-12">
                    <Row className="justify-content-center align-items-center">
                        {todaysMatches?.length > 0 ? todaysMatches?.map((match, index) =>
                        <Col>
                            <Card style={{ width: 'auto', padding: "1rem", margin: "3px" }} className="text-center live-box shadow" key={index} >
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            <strong>{match.awayTeam.teamTricode}</strong >
                                         
                                            <span style={{color: "gray"}}> vs </span>
                                            <strong>{match.homeTeam.teamTricode}</strong >
                                        </Col>
                                    </Row>  
                                </Card.Title>
                                    
                            </Card>
                        </Col>
                                ) 
                                :
                                <h3>No matches today</h3>
                        }
                    </Row>
                    </div>
                </Row>
        </Container>

        </>
    )
}

export default SmallLiveScores;