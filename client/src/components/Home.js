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
    const [showScore, setShowScore] = useState(true);
    const [firstComponentHeight, setFirstComponentHeight] = useState(0);

    const getNews = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + '/api/')
            setLastNews(fetchedData.data[0].articles)
            
        } catch (error) {
            console.log(error)
        }
    }  

    useEffect(() => {
        getNews()
    }, [])

    const toggleScore = () => {
        setShowScore(!showScore)
    }

    useEffect(() => {
        toggleScore()
    }, [])

    


    const handleFirstComponentHeight = (height) => {
        setFirstComponentHeight(height);
    };

    return (
        <>
        <br/>
        {/* {console.log(lastNews)} */}
        <Container>
          <LiveScores onHeightChange={handleFirstComponentHeight}/>
            <br/>
                <h1 style={{marginTop:firstComponentHeight + 5}}>Latest News</h1>
                <br />
            <Container className="d-flex align-items-center justify-content-center news-container" >
                <Col md='8' >          
                    {lastNews?.map((news, index) => (
                        
                        <a href={news.links.web.href} style={{textDecoration:"none", color:"darkgray"}} target="_blank">
                        <Card key={index} className="box-news mb-3 shadow-sm"    >
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
            <br />
        </Container>
        </>
    )
}

export default Home;