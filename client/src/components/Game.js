import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Nav , Container, Row, Col, Table} from "react-bootstrap";


const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function Game() {
    const { gameId } = useParams()
    const [game, setGame] = useState();
    const [playersAway, setPlayersAway] = useState();
    const [playersHome, setPlayersHome] = useState();
    const [activeTab, setActiveTab] = useState("stats");
    
    
    const getGameInfo = async () => {
        try {
            const fetchedData = await axios.get(BASE_URL + `/api/games/${gameId}`)
            console.log(fetchedData)
            setGame(fetchedData.data)
            setPlayersAway(fetchedData.data.away.players);
            setPlayersHome(fetchedData.data.home.players);

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getGameInfo()
    }, [])

    const handleSelect = (tab) => {
        setActiveTab(tab)
    }
    
    const sortTableDataAway = (column) => {
        const toSecs = (string) => {
            var minStr = string.split(":")
            var seconds = (+minStr[0] * 60 + minStr[1])
            return seconds
        }
        const sortedData = [...playersAway].sort((a, b) => {
            if (column === "minutes") {

                if (Number(toSecs(a.statistics[column])) > Number(toSecs(b.statistics[column]))) {
                    return -1
                }
                if (Number(toSecs(a.statistics[column])) < Number(toSecs(b.statistics[column]))) {
                    return 1
                }
                return 0;
            }
            if (Number(a.statistics[column]) > Number(b.statistics[column])) {
                return -1
            }
            if (Number(a.statistics[column]) < Number(b.statistics[column])) {
                return 1
            }
            return 0;

        }
            )
        setPlayersAway(sortedData);
    }

    const sortTableDataHome = (column) => {
        const toSecs = (string) => {
            var minStr = string.split(":")
            var seconds = (+minStr[0] * 60 + minStr[1])
            return seconds
        }
        const sortedData = [...playersHome].sort((a, b) => {
            if (column === "minutes") {

                if (Number(toSecs(a.statistics[column])) > Number(toSecs(b.statistics[column]))) {
                    return -1
                }
                if (Number(toSecs(a.statistics[column])) < Number(toSecs(b.statistics[column]))) {
                    return 1
                }
                return 0;
            }
            if (Number(a.statistics[column]) > Number(b.statistics[column])) {
                return -1
            }
            if (Number(a.statistics[column]) < Number(b.statistics[column])) {
                return 1
            }
            return 0;

        }
            )
        setPlayersHome(sortedData);
    }

    return (
        <>
        {/* {console.log(playersAway)} */}
        <Container>
        <Card>
            <Card.Header>
                <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="stats">
                        Stats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={game.away.name}>
                        {game.away.name}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={game.home.name}>
                        {game.home.name}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
            <Card.Title>
            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.away.alias.toLowerCase()}.png`} style={{width:"8rem", marginRight:"1px", marginRight:"1px"}}/>
            {game?.away?.name} @ {game?.home?.name}
            <img src={`https://a.espncdn.com/i/teamlogos/nba/500-dark/${game?.home.alias.toLowerCase()}.png`} style={{width:"8rem", marginRight:"1px", marginRight:"1px"}}/>
            <br/>
            -{game?.status}-
            </Card.Title>
        <Card.Subtitle>{game?.venue?.name}</Card.Subtitle>
        
            <Container>
            T: {game?.quarter} - {game?.clock}
            <Row>
                <Col className="col-md-5">
                    <Row className=" d-flex justify-content-center" style={{fontSize:"8rem"}}>
                    {game?.away.points}
                    </Row>
                </Col>
                <Col className="col-md-2">
                <Row className=" d-flex justify-content-center" style={{fontSize:"8rem"}}>
                    -
                    </Row>
                </Col>
                <Col className="col-md-5" style={{fontSize:"8rem"}}>
                    <Row className=" d-flex justify-content-center">
                    {game?.home.points}
                    </Row>
                </Col>
                <Row>
                    <Container className="col-md-4">
                        <Table striped bordered size="sm">
                            <tbody>
                                <tr>
                                {game?.away?.scoring?.map(period => (
                                    <td>T{period.number}</td>                                
                                    ))}
                                </tr>
                                <tr>
                                    {game?.away?.scoring?.map(period => (
                                        <td>{period.points}</td>                                
                                        ))}
                                </tr>
                                <tr>
                                    {game?.home?.scoring?.map(period => (
                                        <td>{period.points}</td>
                                        ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Row>
</Row>
            </Container>

    {activeTab === "stats" && 
            <Container>
                <Row>
            <Container className="col-md-8">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>TEAM</th>
                                <th>{game.away.name}</th>
                                <th>{game.home.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2pt FG</td>
                                <td>{game?.away.statistics.two_points_made} / {game?.away.statistics.two_points_att}</td>
                                <td>{game?.home.statistics.two_points_made} / {game?.home.statistics.two_points_att}</td>
                            </tr>
                            <tr>
                                <td>2pt FG %</td>
                                <td>{game?.away.statistics.two_points_pct}%</td>
                                <td>{game?.home.statistics.two_points_pct}%</td>
                            </tr>
                            <tr>
                                <td>3pt FG</td>
                                <td>{game?.away.statistics.three_points_made} / {game?.away.statistics.three_points_att}</td>
                                <td>{game?.home.statistics.three_points_made} / {game?.home.statistics.three_points_att}</td>
                            </tr>
                            <tr>
                                <td>3pt FG %</td>
                                <td>{game?.away.statistics.three_points_pct}%</td>
                                <td>{game?.home.statistics.three_points_pct}%</td>
                            </tr>
                            <tr>
                                <td>FG</td>
                                <td>{game?.away.statistics.field_goals_made} / {game?.away.statistics.field_goals_att}</td>
                                <td>{game?.home.statistics.field_goals_made} / {game?.home.statistics.field_goals_att}</td>
                            </tr>
                            <tr>
                                <td>FG %</td>
                                <td>{game?.away.statistics.field_goals_pct}%</td>
                                <td>{game?.home.statistics.field_goals_pct}%</td>
                            </tr>
                            <tr>
                                <td>FT</td>
                                <td>{game?.away.statistics.free_throws_made} / {game?.away.statistics.free_throws_att}</td>
                                <td>{game?.home.statistics.free_throws_made} / {game?.home.statistics.free_throws_att}</td>
                            </tr>
                            <tr>
                                <td>FT %</td>
                                <td>{game?.away.statistics.free_throws_pct}%</td>
                                <td>{game?.home.statistics.free_throws_pct}%</td>
                            </tr>
                            <tr>
                                <td>FG effective %</td>
                                <td>{game?.away.statistics.effective_fg_pct}%</td>
                                <td>{game?.home.statistics.effective_fg_pct}%</td>
                            </tr>
                            <tr>
                                <td>Def. Rebounds</td>
                                <td>{game?.away.statistics.defensive_rebounds + game?.away.statistics.team_defensive_rebounds}</td>
                                <td>{game?.home.statistics.defensive_rebounds + game?.home.statistics.team_defensive_rebounds}</td>
                            </tr>
                            <tr>
                                <td>Off. Rebounds</td>
                                <td>{game?.away.statistics.offensive_rebounds + game?.away.statistics.team_offensive_rebounds}</td>
                                <td>{game?.home.statistics.offensive_rebounds + game?.home.statistics.team_offensive_rebounds}</td>
                            </tr>
                            <tr>
                                <td>Tot. Rebounds</td>
                                <td>{game?.away.statistics.total_rebounds}</td>
                                <td>{game?.home.statistics.total_rebounds}</td>
                            </tr>
                            <tr>
                                <td>Assist</td>
                                <td>{game?.away.statistics.assists}</td>
                                <td>{game?.home.statistics.assists}</td>
                            </tr>
                            <tr>
                                <td>Turnover</td>
                                <td>{game?.away.statistics.total_turnovers}</td>
                                <td>{game?.home.statistics.total_turnovers}</td>
                            </tr>
                            <tr>
                                <td>Steals</td>
                                <td>{game?.away.statistics.steals}</td>
                                <td>{game?.home.statistics.steals}</td>
                            </tr>
                            <tr>
                                <td>Points in paint</td>
                                <td>{game?.away.statistics.points_in_paint}</td>
                                <td>{game?.home.statistics.points_in_paint}</td>
                            </tr>
                            <tr>
                                <td>Fouls</td>
                                <td>{game?.away.statistics.total_fouls}</td>
                                <td>{game?.home.statistics.total_fouls}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Container>
            </Row>
            </Container>     
        }
    {activeTab === `${game.away.name}` && 
        <Container>
            <div>PLAYERS</div>
          
                <Table striped size="sm">
                    <thead className="justify-content-center">
                        <th>
                        <h3>{game?.away.name}</h3>
                        </th>
                        <th onClick={() => sortTableDataAway("minutes")} style={{cursor: "s-resize"}}>Mins</th>
                        <th onClick={() => sortTableDataAway("two_points_made")} style={{cursor: "s-resize"}}>2pt FG</th>
                        <th onClick={() => sortTableDataAway("three_points_made")} style={{cursor: "s-resize"}}>3pt FG</th>
                        <th onClick={() => sortTableDataAway("field_goals_made")} style={{cursor: "s-resize"}}>FG</th>
                        <th onClick={() => sortTableDataAway("field_goals_pct")} style={{cursor: "s-resize"}}> FG%</th>
                        <th onClick={() => sortTableDataAway("effective_fg_pct")} style={{cursor: "s-resize"}}>eff. % </th>
                        <th onClick={() => sortTableDataAway("free_throws_made")} style={{cursor: "s-resize"}}>FT</th>
                        <th onClick={() => sortTableDataAway("points")} style={{cursor: "s-resize"}}>Pts</th>
                        <th onClick={() => sortTableDataAway("offensive_rebounds")} style={{cursor: "s-resize"}}>O. Reb</th>
                        <th onClick={() => sortTableDataAway("defensive_rebounds")} style={{cursor: "s-resize"}}>D. Reb</th>
                        <th onClick={() => sortTableDataAway("rebounds")} style={{cursor: "s-resize"}}>Reb</th>
                        <th onClick={() => sortTableDataAway("assists")} style={{cursor: "s-resize"}}>Ass</th>
                        <th onClick={() => sortTableDataAway("turnovers")} style={{cursor: "s-resize"}}>TO</th>
                        <th onClick={() => sortTableDataAway("steals")} style={{cursor: "s-resize"}}>Steals</th>
                        <th onClick={() => sortTableDataAway("blocks")} style={{cursor: "s-resize"}}>Blks</th>
                        <th onClick={() => sortTableDataAway("pls_min")} style={{cursor: "s-resize"}}>+/-</th>
                    </thead>
                    <tbody >
                        {playersAway?.map(player => (
                        <tr>
                        <td>
                            {player.full_name}
                        </td>
                        <td>
                            {player.statistics.minutes}
                        </td>
                        <td>
                            {player.statistics.two_points_made} / {player.statistics.two_points_att}
                        </td>
                        <td>
                            {player.statistics.three_points_made} / {player.statistics.three_points_att}
                        </td>
                        <td>
                            {player.statistics.field_goals_made} / {player.statistics.field_goals_att}
                        </td>
                        <td>
                            {player.statistics.field_goals_pct}%
                        </td>
                        <td>
                            {player.statistics.effective_fg_pct}%
                        </td>
                        <td>
                            {player.statistics.free_throws_made} / {player.statistics.free_throws_att}
                        </td>
                        <td>
                            {player.statistics.points}
                        </td>
                        <td>
                            {player.statistics.offensive_rebounds}
                        </td>
                        <td>
                            {player.statistics.defensive_rebounds}
                        </td>
                        <td>
                            {player.statistics.rebounds}
                        </td>
                        <td>
                            {player.statistics.assists}
                        </td>
                        <td>
                            {player.statistics.turnovers}
                        </td>
                        <td>
                            {player.statistics.steals}
                        </td>
                        <td>
                            {player.statistics.blocks}
                        </td>
                        <td>
                            {player.statistics.pls_min}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
           
        </Container>
        }
        {activeTab === `${game.home.name}` && 
        <Container>
            <div>PLAYERS</div>
          
                <Table striped size="sm">
                    <thead className="justify-content-center">
                        <th>
                        <h3>{game?.home.name}</h3>
                        </th>
                        <th onClick={() => sortTableDataHome("minutes")} style={{cursor: "s-resize"}}>Mins</th>
                        <th onClick={() => sortTableDataHome("two_points_made")} style={{cursor: "s-resize"}}>2pt FG</th>
                        <th onClick={() => sortTableDataHome("three_points_made")} style={{cursor: "s-resize"}}>3pt FG</th>
                        <th onClick={() => sortTableDataHome("field_goals_made")} style={{cursor: "s-resize"}}>FG</th>
                        <th onClick={() => sortTableDataHome("field_goals_pct")} style={{cursor: "s-resize"}}> FG%</th>
                        <th onClick={() => sortTableDataHome("effective_fg_pct")} style={{cursor: "s-resize"}}>eff. % </th>
                        <th onClick={() => sortTableDataHome("free_throws_made")} style={{cursor: "s-resize"}}>FT</th>
                        <th onClick={() => sortTableDataHome("points")} style={{cursor: "s-resize"}}>Pts</th>
                        <th onClick={() => sortTableDataHome("offensive_rebounds")} style={{cursor: "s-resize"}}>O. Reb</th>
                        <th onClick={() => sortTableDataHome("defensive_rebounds")} style={{cursor: "s-resize"}}>D. Reb</th>
                        <th onClick={() => sortTableDataHome("rebounds")} style={{cursor: "s-resize"}}>Reb</th>
                        <th onClick={() => sortTableDataHome("assists")} style={{cursor: "s-resize"}}>Ass</th>
                        <th onClick={() => sortTableDataHome("turnovers")} style={{cursor: "s-resize"}}>TO</th>
                        <th onClick={() => sortTableDataHome("steals")} style={{cursor: "s-resize"}}>Steals</th>
                        <th onClick={() => sortTableDataHome("blocks")} style={{cursor: "s-resize"}}>Blks</th>
                        <th onClick={() => sortTableDataHome("pls_min")} style={{cursor: "s-resize"}}>+/-</th>
                    </thead>
                    <tbody >
                        {playersHome?.map(player => (
                        <tr>
                        <td>
                            {player.full_name}
                        </td>
                        <td>
                            {player.statistics.minutes}
                        </td>
                        <td>
                            {player.statistics.two_points_made} / {player.statistics.two_points_att}
                        </td>
                        <td>
                            {player.statistics.three_points_made} / {player.statistics.three_points_att}
                        </td>
                        <td>
                            {player.statistics.field_goals_made} / {player.statistics.field_goals_att}
                        </td>
                        <td>
                            {player.statistics.field_goals_pct}%
                        </td>
                        <td>
                            {player.statistics.effective_fg_pct}%
                        </td>
                        <td>
                            {player.statistics.free_throws_made} / {player.statistics.free_throws_att}
                        </td>
                        <td>
                            {player.statistics.points}
                        </td>
                        <td>
                            {player.statistics.offensive_rebounds}
                        </td>
                        <td>
                            {player.statistics.defensive_rebounds}
                        </td>
                        <td>
                            {player.statistics.rebounds}
                        </td>
                        <td>
                            {player.statistics.assists}
                        </td>
                        <td>
                            {player.statistics.turnovers}
                        </td>
                        <td>
                            {player.statistics.steals}
                        </td>
                        <td>
                            {player.statistics.blocks}
                        </td>
                        <td>
                            {player.statistics.pls_min}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
           
        </Container>
        }
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}

export default Game;