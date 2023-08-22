import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios'; 
import LiveScores from '../LiveScores';

// jest.mock('axios');

// const mockData = {
//     data: [
//       {
//         scoreboard: {
//           games: [
//             {
//               awayTeam: { teamTricode: 'AWY', score: 10 },
//               homeTeam: { teamTricode: 'HME', score: 20 },
//               gameStatus: 2,
//             },
//           ],
//         },
//       },
//     ],
//   };

// axios.get.mockResolvedValue(mockData);

test('Renders live score', async () => {
    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const containerElement = await screen.findByTestId('container-matches');
    expect(containerElement).toBeInTheDocument();

    // render(<LiveScores onHeightChange={() =>{}} toggleLive={true}/>)

    // userEvent.click(screen.getByLabelText('show scores'));
    // expect(screen.getByText('10 : 20')).toBeInTheDocument();
    // userEvent.click(screen.getByLabelText('show scores'));
    // expect(screen.getByText('-- : --')).toBeInTheDocument();
  });
  
  
