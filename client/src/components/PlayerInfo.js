import {Container, Card, Stack, Row, Col} from 'react-bootstrap/';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

function PlayerInfo(props) {
    const {playerInfo} = props;

    return (
        <>
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width:"70%"}}>
                <Row className='align-items-center'>
                    <Col md="6">
                        <Card.Img 
                        style={{width:"20rem", marginTop:"2rem", marginLeft:"2rem"}} 
                        variant='left'
                        src={playerInfo?.reference ? 
                            `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerInfo?.reference}.png` : anonymous} />
                    </Col>
                    <Col md="6">
                            <Stack gap={3}>
                            <div style={{marginTop:"5%"}}>born: {playerInfo?.birthdate}</div>
                            <div>birth place: {playerInfo?.birth_place}</div>
                            <div>high school: {playerInfo?.high_school}</div>
                            <div style={{marginBottom:"5%"}}>college: {playerInfo?.college}</div>
                            </Stack>
                    </Col>
                </Row>
                <Row className='align-items-center' style={{marginTop:"5%"}}>
                    <Col md="6" className='text-center'>
                        <Stack>
                        <div>draft: {playerInfo?.draft?.year}</div>
                        <div>draft round: #{playerInfo?.draft?.pick}</div>
                        <div>draft pick: #{playerInfo?.draft?.round}</div>
                        <div style={{marginBottom:"5%"}}>draft team: <img src={logos[`${playerInfo?.team?.id}`]} style={{ width: "30px", marginBottom:"1%" }} alt="logo"/></div>
                        </Stack>
                    </Col>
                    <Col>
                        <Stack>
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