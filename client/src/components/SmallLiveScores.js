import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Button} from "react-bootstrap";
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
    }

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.clientHeight;
            onHeightChange(height);
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
    }, [])

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.clientHeight;
            onHeightChange(height);
        }
    }, [todaysMatches.length]);

    useEffect(() => {
        getMatches();
    }, [])

    return (
        <>
        <Grid>
        <Container className={`d-grid live-container ${isBlurry ? 'blur' : ''}`} ref={ref} style={{width:"10%", opacity:"0.7", justifyItems:"end"}}>
            <div style={{display:"grid", gridTemplateColumns: "auto auto", justifyContent:"space-between"}}>
                <Button style={{justifySelf:"end"}} variant="outline-secondary" onClick={() => {toggleLive(); onHeightChange()}}>X</Button>
            </div>
                <Row className="justify-content-center">
                    <div className="col-md-12">
                    <Row className="justify-content-center align-items-center">
                        {todaysMatches?.length > 0 ? todaysMatches?.map((match, index) =>
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
                                ) 
                                :
                                <h3>No matches today</h3>
                        }
                    </Row>
                    </div>
                </Row>
        </Container>
        </Grid>
        </>
    )
}

export default SmallLiveScores;