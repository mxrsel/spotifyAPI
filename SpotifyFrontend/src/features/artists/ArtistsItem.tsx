import React from 'react';
import {Artist} from "../../types.ts";
import {NavLink} from "react-router-dom";
import {BASE_URL} from "../../globalConstants.ts";
import {Card, CardMedia} from "@mui/material";

interface Props {
    artist: Artist
    artistId: string
}


const ArtistsItem: React.FC<Props> = ({artist}) => {
    return (
        <div className='container'>
            <div className='row'>
            <NavLink to={`/albums/${artist._id}/albums`}>
                <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: 800, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        image={`${BASE_URL}/public/${artist.artistImage}`}
                        alt={artist.name || 'Post image'}
                        sx={{ width: 170, height: 170, objectFit: 'cover' }}
                    />

                        <div className='card-header'>
                            {artist.name}
                        </div>
                        <div className='card-body'>
                            {artist.artistBio}
                        </div>
                    </Card>
            </NavLink>
            </div>
        </div>
    );
};

export default ArtistsItem;