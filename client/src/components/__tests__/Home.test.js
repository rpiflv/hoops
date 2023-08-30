import React from 'react';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios'; 
import Home from '../Home';

jest.mock('axios');
// jest.mock("../LiveScores", () => {
//     return () => <div>Mocked LiveScores</div>
// })

const mockData = {
    data: 
            {
                articles: 
                    [
                        {
                            headline: "news 1",
                            images: [{url: "https://a.espncdn.com/photo/2022/1104/r1085823_1296x729_16-9.jpg"}],
                            description: "blablabla" ,
                            links: {
                                web: "xxxx"
                            }
                        },
                        {
                            headline: "news 2",
                            images: [{url: "https://a.espncdn.com/photo/2022/1104/r1085823_1296x729_16-9.jpg"}],
                            description: "blablabla" ,
                            links: {
                                web: "xxxx"
                            }
                        },
                    ]
            }
  };
  axios.get.mockResolvedValue(mockData);

  test('Renders fetched news', async () => {
      render(<Home />);
    const resolvedNewsElement = await waitFor(() => screen.getAllByTestId('newsbox'));
    expect(resolvedNewsElement.length).toBe(2);
  });

  test('Conditional rendering of games banner', () => {
    render(<Home/>);
    const gameBannerElement = screen.getByTestId("container-matches");
    expect(gameBannerElement).toBeInTheDocument();
    const gameBannerBtnElement = screen.getByTestId("toggle-btn-games-banner");
    fireEvent.click(gameBannerBtnElement);
    expect(gameBannerElement).not.toBeInTheDocument();
    const gameBannerElementSmall = screen.getByTestId("container-matches-small");
    expect(gameBannerElementSmall).toBeInTheDocument();
  });

  
  
