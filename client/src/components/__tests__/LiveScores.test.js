import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import LiveScores from '../LiveScores';

jest.mock('axios');

const mockData = {
    data: [
      [],
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

test('Renders live score container', async () => {
    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const containerElement = await screen.findByTestId('container-matches');
    waitFor(() => expect(containerElement).toBeInTheDocument())
  });

test("Renders live scores", async () => {
  render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
  const scoreDivElement = await screen.findByTestId("score-tab-nogames");
  waitFor(() => expect(scoreDivElement.innerText.toBeInTheDocument()))
})
  
  
