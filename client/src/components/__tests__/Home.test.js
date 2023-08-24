import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import Home from '../Home';

jest.mock('axios');
jest.mock("../LiveScores", () => {
    return () => <div>Mocked LiveScores</div>
})

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
                    ]
            }
  };
  // data[0].articles[0].headline
  axios.get.mockResolvedValue(mockData);
  
  test('Renders fetched news', async () => {
      render(<Home />);
    // console.log(mockData.data.articles.description)
    // const cardNewsElement = ;
    const resolvedNewsElement = await waitFor(() => screen.getAllByTestId('newsbox'));
    expect(resolvedNewsElement.length).toBe(1);
  });

//   test('Renders 6 news', async () => {
//     render(<Home />);
//     const cardNewsElement = screen.getAllByTestId('newsbox');
//     waitFor(() => expect(cardNewsElement.length).toBe(6))
//   });

  
  
