import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const response = await tmdbApi.getVideos(category, props.id);
            setVideos(response.results);
        }
        getVideos();
    }, [category, props.id])

    return (
        <>
            {
                videos.map((video, i) => (
                    <Video key={i} video={video} />
                ))
            }
        </>
    );
};

const Video = props => {
    const video = props.video;
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        console.log(height);
        iframeRef.current.setAttribute('height', height);
    }, [])

    return (
        <div className="video">
            <div className="video__title">
                <h2>{video.name}</h2>
            </div>
            <iframe
                src={`https:www.youtube.com/embed/${video.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
                allow="fullscreen"
            >
            </iframe>
        </div>
    )
}

export default VideoList;
