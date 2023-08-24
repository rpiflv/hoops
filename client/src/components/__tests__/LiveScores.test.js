
import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import LiveScores from '../LiveScores';
import axios from "axios";

jest.mock("axios");



describe("LiveScore", () => {

  // beforeEach(() => jest.mock("../__mocks__/LiveScores/axios"));
  afterEach(cleanup);
  
  test('Renders live score container', async () => {
    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const containerElement = await screen.findByTestId('container-matches');
    await waitFor(() => expect(containerElement).toBeInTheDocument())
  });
  
  test("Renders 'no game' in case there are no matches", async () => {
    const mockLiveScores2 = {
      scoreboard: {
        gameDate: "2023-08-23",
        leagueId: "00",
        leagueName: "National Basketball Association",
        games: []
      }
  };
    axios.get.mockResolvedValue({data: mockLiveScores2});

    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const scoreNoGameElement = await screen.findByTestId("score-tab-nogames");
    await waitFor(() => expect(scoreNoGameElement).toBeInTheDocument());
  });

  test("Renders game score", async () => {
    const mockLiveScores = {
      scoreboard: {
        gameDate: "2023-08-23",
        leagueId: "00",
        leagueName: "National Basketball Association",
        games: [{
          awayTeam: {
            teamTricode: "GSW",
            score: 20
          },
          homeTeam: {
            teamTricode: "MIA",
            score: 22
          }
        }]
      }
  };
  
  axios.get.mockResolvedValue({data: mockLiveScores});
    render(<LiveScores onHeightChange={() => {}} toggleLive={() => {}} />);
    const scoreGameElement = await screen.findByTestId("score-tab-games");
    await waitFor(() => expect(scoreGameElement).toBeInTheDocument());
  });
});
  
  
