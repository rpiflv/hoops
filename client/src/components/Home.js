import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../App.css';
import LiveScores from "./LiveScores";
import SmallLiveScores from "./SmallLiveScores";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Home() {
    
    const [lastNews, setLastNews] = useState([]);
    const [firstComponentHeight, setFirstComponentHeight] = useState(0);
    const [showScore, setShowScore] = useState(true);
    const [showLive, setShowLive] = useState(true);
    
    useEffect(() => {
        const getNews = async () => {
            try {
                const fetchedData = await axios.get(BASE_URL + '/api/');
                setLastNews(fetchedData.data[0].articles);
                
            } catch (error) {
                console.log(error);
            }
        }  
        getNews();
    }, [])
    
    useEffect(() => {
        const toggleScore = () => {
            setShowScore(!showScore);
        }
        toggleScore();
    }, []);

    const handleFirstComponentHeight = (height) => {
        setFirstComponentHeight(height);
    };

    const toggleLive = () => {
        setShowLive(!showLive);
    }

    return (
        <>
        <br/>
        <div className="live-score-container">
            <Row className="d-flex justify-content-center ">
            <Col>
            {!showLive ? (
                <SmallLiveScores onHeightChange={handleFirstComponentHeight} toggleLive={toggleLive} className="fade-in" />
                ) : (
                    <LiveScores onHeightChange={handleFirstComponentHeight} toggleLive={toggleLive} />
                    )
                }
            </Col>
            </Row>
        </div>           
            <Row>  
            <Container className="d-flex align-items-center justify-content-center news-container" >
                <Col md='8' >          
                    {lastNews?.map((news, index) => (
                        <a key={index} href={news.links.web.href} style={{textDecoration:"none", color:"darkgray"}} target="_blank" rel="noreferrer">
                        <Card className="box-news mb-3">
                            <Card.Title style={{color: "black"}}> {news.headline}</Card.Title>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <Card.Img src={news.images[0]?.url} style={{height: "auto", width:"20rem", padding:"8px"}} variant="bottom"/>
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
                    </Row>
            <br />
        </>
    )
}

export default Home;