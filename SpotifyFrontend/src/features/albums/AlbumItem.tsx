import React from 'react';
import {Album} from "../../types.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";

interface Props {
    albums: Album;
}

const AlbumItem: React.FC<Props> = ({albums}) => {
    return (
        <div>
            <NavLink to={`/albums/${albums._id}`}>
                <div className='card mt-5 '>
                    <div className='card-img'>
                        {albums.albumImage && (
                            <img src={`${BASE_URL}/${albums.albumImage}`} alt={albums.name}/>
                        )}
                    </div>
                    <div className='card-header'>
                        {albums.name}
                    </div>
                    <div className='card-body'>
                        {albums.released}
                    </div>
                    <p></p>
                </div>
            </NavLink>
        </div>
    );
};

export default AlbumItem;