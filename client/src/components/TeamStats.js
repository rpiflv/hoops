import React from "react";
import { Container , Table} from "react-bootstrap";

function TeamStats (props) {

const teamStats = props.teamStats;

    return (
        <>
        <Container>
            {console.log(teamStats)}
            <Table striped="columns" hover>
                <tbody>
                    <tr>
                        <td style={{width:"2rem"}}>
                        Games
                        </td>
                        <td style={{width:"10rem"}}>
                        Pts per game
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Pts per game
                        </td>
                        <td style={{width:"10rem"}} >
                        Tot. Pts
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Tot. Pts
                        </td>
                    </tr>
                    <tr style={{fontWeight:"300"}}>
                        <td>
                            {teamStats?.own_record.total.games_played}
                        </td>
                        <td >
                            {teamStats?.own_record.average.points}
                        </td>
                        <td >
                            {teamStats?.opponents.average.points}
                        </td>
                        <td >
                            {teamStats?.own_record.total.points}
                        </td>
                        <td >
                            {teamStats?.opponents.total.points}
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"2rem"}}>
                        
                        </td>
                        <td style={{width:"10rem"}}>
                        2pt FG%
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. 2pt FG%
                        </td>
                        <td style={{width:"10rem"}} >
                        3pt FG%
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. 3pt FG%
                        </td>
                    </tr>
                    <tr style={{fontWeight:"300"}}>
                        <td>
                        </td>
                        <td >
                            {teamStats?.own_record.total.two_points_pct}
                        </td>
                        <td >
                            {teamStats?.opponents.total.two_points_pct}
                        </td>
                        <td >
                            {teamStats?.own_record.total.three_points_pct}
                        </td>
                        <td >
                            {teamStats?.opponents.total.three_points_pct}
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"2rem"}}>
                        
                        </td>
                        <td style={{width:"10rem"}}>
                        Eff. FG%
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Eff. FG%
                        </td>
                        <td style={{width:"10rem"}} >
                        Pts in paint
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Pts in paint
                        </td>
                    </tr>
                    <tr style={{fontWeight:"300"}}>
                        <td>
                        </td>
                        <td >
                            {teamStats?.own_record.total.effective_fg_pct}
                        </td>
                        <td >
                            {teamStats?.opponents.total.effective_fg_pct}
                        </td>
                        <td >
                            {teamStats?.own_record.average.points_in_paint}
                        </td>
                        <td >
                            {teamStats?.opponents.average.points_in_paint}
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"2rem"}}>
                        
                        </td>
                        <td style={{width:"10rem"}}>
                        Def. Reb. 
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Def. Reb.
                        </td>
                        <td style={{width:"10rem"}} >
                        Off. Reb.
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Off. Reb.
                        </td>
                    </tr>
                    <tr style={{fontWeight:"300"}}>
                        <td>
                        </td>
                        <td >
                            {teamStats?.own_record.average.def_rebounds}
                        </td>
                        <td >
                            {teamStats?.opponents.average.def_rebounds}
                        </td>
                        <td >
                            {teamStats?.own_record.average.off_rebounds}
                        </td>
                        <td >
                            {teamStats?.opponents.average.off_rebounds}
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:"2rem"}}>
                        
                        </td>
                        <td style={{width:"10rem"}}>
                        Assist
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Assist
                        </td>
                        <td style={{width:"10rem"}} >
                        Steals
                        </td>
                        <td style={{width:"10rem"}} >
                        Opp. Steals
                        </td>
                    </tr>
                    <tr style={{fontWeight:"300"}}>
                        <td>
                        </td>
                        <td >
                            {teamStats?.own_record.average.assists}
                        </td>
                        <td >
                            {teamStats?.opponents.average.assists}
                        </td>
                        <td >
                            {teamStats?.own_record.average.steals}
                        </td>
                        <td >
                            {teamStats?.opponents.average.steals}
                        </td>
                    </tr>
                </tbody>

            </Table>
        </Container>
        </>
    )
};

export default TeamStats;