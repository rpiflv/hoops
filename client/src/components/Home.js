import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../App.css';



const BASE_URL = process.env.REACT_APP_BASE_URL || '';


function Home() {

    const [lastNews, setLastNews] = useState('');
    const [todaysMatches, setTodaysMatches] = useState([])
    const [showScore, setShowScore] = useState(true)

    // const getNews = async () => {
    //     try {
    //         const fetchedData = await axios.get(BASE_URL + '/api/')
    //         console.log(fetchedData.data.news)
    //         setLastNews(fetchedData.data.news)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const getMatches = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setTodaysMatches(fetchedData.data.matches.scoreboard.games)
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     getNews()
    // }, [])

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
            <h1>Last News</h1>
            <br />
            {/* <Container>
                <Col md='auto'>
                    <ListGroup >
                        {lastNews &&
                            lastNews?.map((news, index) => (
                                <ListGroup.Item key={index} className="box" >
                                    <a href={news.url}>
                                        <div>
                                            {news.title}
                                        </div>
                                    </a>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Container> */}
            <br />
            <h2>Today's NBA matches</h2>
            <Col md={{ span: 2, offset: 9 }}>
                <MDBSwitch id='flexSwitchCheckDefault' label='show score' labelStyle={{ color: 'blue' }} onClick={toggleScore} />
            </Col>

            {/* {console.log(todaysMatches)} */}
            <Container>
                <Row className="justify-content-md-center">

                    {todaysMatches.length > 0 ?

                        todaysMatches.map((match, index) =>
                            <Card style={{ width: '28%', margin: "5px" }} className="text-center box" key={index}>
                                <Card.Body>
                                    <Card.Header>
                                        <strong>{match.awayTeam.teamTricode}</strong > <i>vs</i> <strong>{match.homeTeam.teamTricode}</strong >
                                    </Card.Header>
                                    <ListGroup.Item>{match.gameStatus === 2 &&
                                        <>LIVE</>
                                    } score: {showScore ? <div>{match.awayTeam.score} : {match.homeTeam.score}</div>
                                        : <div>-- : --</div>}
                                    </ListGroup.Item>
                                </Card.Body>
                            </Card>
                        ) :
                        <h3>No mathes today</h3>
                    }
                </Row>
            </Container>
        </>
    )
}

export default Home;