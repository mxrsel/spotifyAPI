import React from 'react';
import {useAppDispatch} from "../../app/hooks.ts";
import {Artist} from "../../types.ts";
import {deleteAdminArtist} from "./artistAdminThunk.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {Button} from "@mui/material";

interface AdminProps {
    artist: Artist;

}

const AdminArtistItem: React.FC<AdminProps> = ({artist}) => {
    const dispatch = useAppDispatch()


    const handleDelete = async() => {
        if (window.confirm('Do you want to delete item?')) {
            await dispatch(deleteAdminArtist(artist._id));
        }
    }
    return (
        <div className='container'>
            <div className='row'>
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
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default AdminArtistItem;