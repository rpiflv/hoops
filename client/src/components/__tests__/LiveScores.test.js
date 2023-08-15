import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios'; // You might need to mock Axios for your tests
import LiveScores from '../LiveScores';

jest.mock('axios');

const mockData = {
    data: [
      {
        scoreboard: {
          games: [
            {
              awayTeam: { teamTricode: 'AWY', score: 10 },
              homeTeam: { teamTricode: 'HME', score: 20 },
              gameStatus: 2,
            },
          ],
        },
      },
    ],
  };

axios.get.mockResolvedValue(mockData);

test('renders today\'s matches', async () => {
    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const containerElement = await screen.findByTestId('test-01');
    expect(containerElement).toBeInTheDocument();
  });
  
  
