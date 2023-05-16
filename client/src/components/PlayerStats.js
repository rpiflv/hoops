import {Container, Table} from 'react-bootstrap/';
import '../App.css';

function PlayerStats(props) {
    const {playerInfo} = props;
    const stats = playerInfo.seasons[0];

    return (
        <>
        <Container>
        <div className='d-flex ms-0' style={{fontWeight:"200"}}>
            {stats.year}/{stats.year+1}
        </div>
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
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        2Pts FG%
                    </th>
                    <th style={{width:"25%"}}>
                        2Pts Attempts
                    </th>
                    <th style={{width:"25%"}}>
                        3Pts FG%
                    </th>
                    <th style={{width:"25%"}}>
                        3Pts Attempts
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.two_points_pct}
                        </td>
                        <td>
                        {team.average.two_points_att}
                        </td>
                        <td>
                        {team.total.three_points_pct}
                        </td>
                        <td>
                        {team.average.three_points_att}
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        FT%
                    </th>
                    <th style={{width:"25%"}}>
                        Avg. FT Attempts
                    </th>
                    <th style={{width:"25%"}}>
                        Eff. FG%
                    </th>
                    <th style={{width:"25%"}}>
                       True Shooting%
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.free_throws_pct}
                        </td>
                        <td>
                        {team.average.free_throws_att}
                        </td>
                        <td>
                        {team.total.effective_fg_pct}
                        </td>
                        <td>
                        {team.total.true_shooting_pct}
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        Assist
                    </th>
                    <th style={{width:"25%"}}>
                        Avg Assist
                    </th>
                    <th style={{width:"25%"}}>
                        TurnOver
                    </th>
                    <th style={{width:"25%"}}>
                       Avg. TO
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.assists}
                        </td>
                        <td>
                        {team.average.assists}
                        </td>
                        <td>
                        {team.total.turnovers}
                        </td>
                        <td>
                        {team.average.turnovers}
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <th style={{width:"25%"}}>
                        Steals
                    </th>
                    <th style={{width:"25%"}}>
                        Avg Steals
                    </th>
                    <th style={{width:"25%"}}>
                        Blocks
                    </th>
                    <th style={{width:"25%"}}>
                       Avg. Blocks
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {team.total.steals}
                        </td>
                        <td>
                        {team.average.steals}
                        </td>
                        <td>
                        {team.total.blocks}
                        </td>
                        <td>
                        {team.average.blocks}
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