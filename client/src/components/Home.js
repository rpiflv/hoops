import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Card, Container, Row } from "react-bootstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';


function Home() {

    const [lastNews, setLastNews] = useState('');
    const [todaysMatches, setTodaysMatches] = useState([])

    const getNews = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setLastNews(fetchedData.data.news)
        } catch (error) {
            console.log(error)
        }
    }
    const getMatches = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setTodaysMatches(fetchedData.data.matches.scoreboard.games)
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

    return (
        <>
            <h1>Last News</h1>
            <br />
            <ListGroup>
                {lastNews &&
                    lastNews.map((news, index) => (
                        <ListGroup.Item key={index} >
                            <a href={news.url}>
                                <div>
                                    {news.title}
                                </div>
                            </a>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <br />
            <h2>Today's matches</h2>
            {/* {console.log(todaysMatches)} */}
            <Container>
                <Row className="justify-content-md-center">

                    {todaysMatches.length > 0 ?

                        todaysMatches.map((match) =>
                            <Card style={{ width: '33%' }} className="text-center">
                                <Card.Body>
                                    <Card.Header>
                                        {match.awayTeam.teamTricode} vs {match.homeTeam.teamTricode}
                                    </Card.Header>
                                    <ListGroup.Item>{match.gameStatus === 2 &&
                                        <>LIVE</>
                                    } score: {match.awayTeam.score} : {match.homeTeam.score}</ListGroup.Item>
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