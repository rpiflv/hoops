import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function LiveScores ({onHeightChange}) {

    const ref = useRef()

    const [todaysMatches, setTodaysMatches] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [isBlurry, setIsBlurry] = useState(false);


    const getMatches = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setTodaysMatches(fetchedData.data[1].scoreboard.games)
        } catch (err) {
            console.log(err)
        }
    }

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
            onHeightChange(height)
        }
    }, [onHeightChange])

    useEffect(() => {
        const interval = setInterval(() => {
          getMatches()
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);


    useEffect(() => {
        getMatches()
    }, [])

    const toggleScore = () => {
        setShowScore(!showScore)
    }

    return (
        <>
          <Container className={`live-container ${isBlurry ? 'blur' : ''}`} ref={ref}>
            <h4>today's matches</h4>
                <Row className="justify-content-center">
                    <div className="col-md-12">
                    <Row className="justify-content-center align-items-center">
                        {todaysMatches?.length > 0 ? todaysMatches?.map((match, index) =>
                            <Card style={{ width: 'auto', padding: "1rem", margin: "3px" }} className="text-center live-box shadow" key={index} >
                                {/* <Card.Body> */}
                                        <Card.Title>
                                            <Row>
                                            <Col>
                                            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${match.awayTeam.teamTricode.toLowerCase()}.png`} style={{width:"2rem", marginLeft:"1px", marginRight:"1px"}}></img>
                                            <strong>{match.awayTeam.teamTricode}</strong >
                                         
                                            <span style={{color: "gray"}}> vs </span>
                                            <strong>{match.homeTeam.teamTricode}</strong >
                                            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${match.homeTeam.teamTricode.toLowerCase()}.png`} style={{width:"2rem"}}></img>
                                            </Col>
                                            </Row>
                                            
                                        </Card.Title>
                                        <ListGroup.Item className="live-score">{match.gameStatus === 2 &&
                                                <span className={"live"}>LIVE</span>
                                            }    score: {showScore ? <div>{match.awayTeam.score} : {match.homeTeam.score}</div>
                                            : <div>-- : --</div>}
                                        </ListGroup.Item>
                                {/* </Card.Body> */}
                            </Card>
                                ) 
                                :
                                <h3>No mathes today</h3>
                        }
                    </Row>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <label htmlFor="showscore" className="ms-auto">show scores</label>
                    <MDBSwitch id="showscore" onClick={toggleScore}/>    
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default LiveScores;