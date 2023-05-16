import {Container, Card, Row, Table} from 'react-bootstrap/';
import logos from "../logos";
import anonymous from "../anonymous.png";
import '../App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

function PlayerStats(props) {
    const {playerInfo} = props;
    const stats = playerInfo.seasons[0]

    return (
        <>
        
        <Container>
            {console.log(stats.teams)}
        {stats.teams.map(team => (
        <div>
        <h3>{team.market} {team.name}</h3>
        <Table striped hover size='sm'>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        Games Played
                    </th>
                    <th style={{width:"25%"}}>
                        Game started
                    </th>
                    <th style={{width:"25%"}}>
                        Tot. Minutes
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. Minutes
                    </th>
                    
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.games_played} 
                        </td>
                        <td>
                        {team.total.games_started}
                        </td>
                        <td>
                        {team.total.minutes}
                        </td>
                        <td>
                        {team.average.minutes}
                        
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        Tot. Points
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. Points
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. Points in paint
                    </th>
                    <th style={{width:"25%"}}>
                        Plus/Minus
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.points}
                        </td>
                        <td>
                        {team.average.points}
                        </td>
                        <td>
                        
                        {team.average.points_in_paint}
                        </td>
                        <td>
                        {team.total.plus}/{team.total.minus}
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        Tot. Def. Reb.
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. Def. Reb.
                    </th>
                    <th style={{width:"25%"}}>
                        Tot. Off. Reb
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. Off. Reb.
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.defensive_rebounds}
                        </td>
                        <td>
                        {team.average.def_rebounds}
                        </td>
                        <td>
                        {team.total.offensive_rebounds}
                        </td>
                        <td>
                        {team.average.off_rebounds}
                        </td>
                    </tr>
                </tbody>
            </Table>
            </div>
        )
        )}
        </Container>
        </>
    )
};

export default PlayerStats;