import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import CastList from './CastList';

import './detail.scss';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';

const Detail = () => {

    const { category, id } = useParams();

    const [items, setItems] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.details(category, id, { params: {} });
            setItems(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {items && (
                <>
                    <div
                        className="banner"
                        style={{ backgroundImage: `url(${apiConfig.originalImage(items.backdrop_path || items.poster_path)})` }}
                    >
                    </div>
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <div
                                className="movie-content__poster__img"
                                style={{ backgroundImage: `url(${apiConfig.originalImage(items.poster_path || items.backdrop_path)})` }}
                            >
                            </div>
                        </div>
                        <div className="movie-content__infor">
                            <h1 className="title">
                                {items.title || items.name}
                            </h1>
                            <div className="genres">
                                {
                                    items.genres && items.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genres__item">{genre.name}</span>
                                    ))
                                }
                            </div>
                            <p className="overview"> {items.overview} </p>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={items.id} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <VideoList id={items.id} />
                        </div>
                        <div className="section__header mb-2">
                            <h2>Similar</h2>
                        </div>
                        <MovieList category={category} type="similar" id={items.id} />
                    </div>
                </>
            )}
        </>
    )
};

export default Detail;
