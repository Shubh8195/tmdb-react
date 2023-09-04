import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

//component
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoading/Img';

import './style.scss'

function HeroBanner() {
    const navigate = useNavigate();
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }

        if(e.type === "click" && query.length > 0){
            navigate(`/search/${query}`)
        }
        
    }

    


    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore Now.</span>
                    <div className="searchInput">
                        <input onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler} type="text" value={query} placeholder="Search for a movie or TV show...." />
                        <button onClick={searchQueryHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
