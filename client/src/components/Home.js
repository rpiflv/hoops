import React, { useEffect, useState } from "react";
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
            {lastNews.map(news =>
                <div>{news.title}</div>)}
        </>
    )
}

export default Home;