import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';



const CastList = props => {
    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category, props.id);
            setCasts(response.cast.slice(0, 5));
        }
        getCredits();
    }, [category, props.id]);
    return (
        <div className="casts">
            {casts.map((cast, i) => (
                <div key={i} className="casts__item">
                    <div
                        className="casts__item__img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
                    >
                    </div>
                    <p className="cast__item__name">{cast.name}</p>
                </div>
            ))}

        </div>
    );
};

export default CastList;
