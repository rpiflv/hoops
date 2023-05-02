import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Home() {

    const [lastNews, setLastNews] = useState([]);
    const [todaysMatches, setTodaysMatches] = useState([])
    const [showScore, setShowScore] = useState(true)

    const getNews = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setLastNews(fetchedData.data[0].articles)
            
        } catch (error) {
            console.log(error)
        }
    }
    const getMatches = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setTodaysMatches(fetchedData.data[1].scoreboard.games)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    useEffect(() => {
        getMatches()
    }, [])

    const toggleScore = () => {
        setShowScore(!showScore)
    }

    useEffect(() => {
        toggleScore()
    }, [])

    return (
        <>
        <br/>
        {/* {console.log(lastNews)} */}
        <Container>
            <Container>
            {/* <Stack direction="horizontal" gap={9}>
                <h2 className="ms-auto">Live Score</h2> */}
            {/* </Stack>       */}


                <Row className="justify-content-md-center">
                    <div className="col-md-12">
                    <Row className="justify-content-md-center">

                        {
                        todaysMatches?.length > 0 ? todaysMatches?.map((match, index) =>
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
            <br/>
                <h1>Latest News</h1>
                <br />
            <Container className="d-flex align-items-center justify-content-center">
                <Col md='8' >          
                    {lastNews?.map((news, index) => (
                        
                        <a href={news.links.web.href} style={{textDecoration:"none", color:"darkgray"}} target="_blank">
                        <Card key={index} className="box-news mb-3 shadow-sm"    >
                            <Card.Title style={{color: "black"}}> {news.headline}</Card.Title>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <Card.Img src={news.images[0].url} style={{height: "auto", width:"20rem", padding:"8px"}} variant="bottom"/>
                                </div>
                                <div className="col-md-6 content-align-center">
                                    <Card.Body className="d-flex align-items-center justify-content-center mt-4">
                                        {news.description}
                                    </Card.Body>
                                </div>
                            </div> 
                        </Card>
                        </a>             
                        ))
                    }                 
                </Col>
            </Container>
            <br />
        </Container>
        </>
    )
}

export default Home;