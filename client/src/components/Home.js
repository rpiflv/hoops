import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';


function Home() {

    const [lastNews, setLastNews] = useState('');

    const getNews = async () => {
        try {
            const data = await axios.get(BASE_URL + '/api/')
            console.log(data.data)
            setLastNews(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <>
            <h1>Last News</h1>
            <br />
            <ListGroup>
                {lastNews &&
                    lastNews.map((news, index) => (
                        <ListGroup.Item key={index} >
                            <a href={news.url}>
                                <div>
                                    {news.title}
                                </div>
                            </a>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </>
    )
}

export default Home;