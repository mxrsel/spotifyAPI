import React from 'react';
import {Artist} from "../../types.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";

interface Props {
    artist: Artist
    artistId: string
}

const ArtistsItem: React.FC<Props> = ({artist}) => {

    return (
        <div className='container'>
            <div className='row'>
            <NavLink to={`/artists/${artist._id}/albums`}>
                <div className='card mt-5 '>
                        <div className='card-img'>
                            {artist.artistImage && (
                                <img style={{borderRadius: '90px'}} src={`${BASE_URL}/${artist.artistImage}`}
                                     alt='image'/>
                            )}
                        </div>
                        <div className='card-header'>
                            {artist.name}
                        </div>
                        <div className='card-body'>
                            {artist.artistBio}
                        </div>
                    </div>
            </NavLink>
            </div>
        </div>
    );
};

export default ArtistsItem;