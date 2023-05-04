import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../App.css';
import LiveScores from "./LiveScores";

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
    // const getMatches = async () => {
    //     try {
    //         const fetchedData = await axios.get(BASE_URL + '/api/')
    //         setTodaysMatches(fetchedData.data[1].scoreboard.games)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        getNews()
    }, [])

    // useEffect(() => {
    //     getMatches()
    // }, [])

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
          <LiveScores/>
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