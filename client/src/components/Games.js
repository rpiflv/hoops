import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Col, Button , Row} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Button.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Games () {
    const d = new Date();
    
    const [games, setGames] = useState([]);
    
    const [day, setDay] = useState(d.getDate());
    const [month, setMonth]  = useState(d.getMonth() + 1);
    const [year, setYear] = useState(d.getFullYear());
    const [loading, setLoading] = useState(false)

    const getMatches = async () => {
        setLoading(true)
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/games/${year}/${month}/${day}`)
            setGames(fetchedData.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getMatches();
    }, [day, month, year])

    const handleDateChange = (amount) => {
        const newDate = new Date (year, month - 1, day + amount);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth() + 1);
        setDay(newDate.getDate());
    }

    return (
        <>
        <div style={{margin:"5%"}}>
        <Row>
            <Col>
                <Button onClick={() => { handleDateChange(-7)}} disabled={loading} className="Button week prev-week shadow-sm"> Previus week </Button>
                <Button onClick={() => { handleDateChange(-1)}} disabled={loading} className="Button day prev-day shadow-sm"> Previus day </Button>
            </Col>
            <Col>
                <h3>Games {year}/{month}/{day}</h3> 
            </Col>
            <Col>
                <Button onClick={() => {handleDateChange(1)}} disabled={loading} className="Button day next-day shadow-sm"> Next day </Button>
                <Button onClick={() => {handleDateChange(7)}} disabled={loading} className="Button week next-week shadow-sm">Next week </Button>

            </Col>
        </Row>
        </div>
        <Container>
        <Row >
        {
            games?.games?.map((game) => 
             

            
            <Col key={game.id}>
                {console.log(game)}
                    { 
                    
                     
                        game.status !== "unnecessary" ? 
                    
                   <Card className="games-box shadow-sm">
                   <Link style={{textDecoration: "none"}} to={game.id} className="link-light">
                   <Card.Title className="games-box-title text-truncate">
                   {game.title}
                   </Card.Title>
                <Card.Body style={{fontStyle: "oblique"}}>
                    <Row className=" d-flex justify-content-center">
                        <Col className="col-md-5 justify-content-md-center">
                            <Row className="justify-content-md-center">
                            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.away.alias.toLowerCase()}.png`} 
                                style={{width:"20rem", marginRight:"1px", marginRight:"1px"}}/>
                            </Row>
                            <Row className="justify-content-md-center">
                                {game.away.alias} 
                            </Row>
                        </Col>
                        <Col className="col-md-2 d-flex align-items-center justify-content-md-center">VS</Col>
                        <Col className="col-md-5">
                        <Row className="justify-content-md-center">

                   <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.home.alias.toLowerCase()}.png`} 
                   style={{width:"20rem", marginLeft:"1px", marginRight:"1px"}}/> 
                   </Row>
                   <Row className="justify-content-md-center">

                   {game.home.alias} 
                   </Row>
                   </Col>
                   </Row>
                   </Card.Body>
                   </Link>
                   </Card> 
                   :
                   <span>
                   <Card className="games-box unnecessary shadow-sm">
                   <Link style={{textDecoration: "none"}} to={game.id} className="link-light">
                   <Card.Title className="games-box-title text-truncate">
                   {game.title}
                   <Card.Subtitle>

                        {game.status}
                   </Card.Subtitle>
                   </Card.Title>
                   <Card.Body>
                    <Row className=" d-flex justify-content-center">
                        <Col className="col-md-5 justify-content-md-center">
                            <Row className="justify-content-md-center">
                            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.away.alias.toLowerCase()}.png`} 
                                style={{width:"5rem", marginRight:"1px", marginRight:"1px"}}/>
                            </Row>
                            <Row className="justify-content-md-center">
                                {game.away.alias} 
                            </Row>
                        </Col>
                        <Col className="col-md-2 d-flex align-items-center justify-content-md-center">VS</Col>
                        <Col className="col-md-5">
                            <Row className="justify-content-md-center">
                             <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.home.alias.toLowerCase()}.png`} 
                                style={{width:"5rem", marginLeft:"1px", marginRight:"1px"}}/> 
                            </Row>
                   <Row className="justify-content-md-center">

                   {game.home.alias} 
                   </Row>
                   </Col>
                   </Row>
                   </Card.Body>
                   </Link>
                   </Card> 
                   </span>
                     
                }
                   </Col>

                   )
                
                   
                }
        </Row>
    </Container>
    </>
        
    )
}

export default Games;