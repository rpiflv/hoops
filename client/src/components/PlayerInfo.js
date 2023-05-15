import {Container, Card, Stack, Row, Col} from 'react-bootstrap/';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerInfo(props) {
    const {playerInfo} = props;

    return (
        <>
        <Container>
            <Card>
                <Row>
                <Col md="3">
                <Card.Img 
                style={{width:"20rem", marginTop:"2rem", marginLeft:"3rem"}} 
                variant='left'
                src={playerInfo?.reference ? 
                    `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerInfo?.reference}.png` : anonymous} />

                </Col>
                <Col md="9">

                <Stack gap={3}>

                <div style={{marginTop:"5%"}}>born: {playerInfo?.birthdate}</div>
                <div>place: {playerInfo?.birth_place}</div>
                <div>high school: {playerInfo?.high_school}</div>
                <div style={{marginBottom:"5%"}}>college: {playerInfo?.college}</div>
               
                <div>draft: {playerInfo?.draft?.year}</div>
                <div>draft round: #{playerInfo?.draft?.pick}</div>
                <div>draft pick: #{playerInfo?.draft?.round}</div>
                <div style={{marginBottom:"5%"}}>draft team: <img src={logos[`${playerInfo?.team?.id}`]} style={{ width: "30px", marginBottom:"1%" }} alt="logo"/></div>
               
                <div>Height: {Math.floor(playerInfo?.height/12)}-{playerInfo?.height%12}</div>
                <div>Weight: {playerInfo?.weight}</div>
                <div>primary position: {playerInfo?.primary_position}</div>
                <div>secondary position: {playerInfo?.position}</div>
                <div>jersey: #{playerInfo?.jersey_number}</div>
                </Stack>
                </Col>
                    </Row>

            </Card>
            {console.log(playerInfo)}        
        </Container>
        </>
    )
};

export default PlayerInfo;