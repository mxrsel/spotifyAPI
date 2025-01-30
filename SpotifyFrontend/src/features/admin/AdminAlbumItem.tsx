import React from 'react';
import {Album} from "../../types.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteAdminAlbum} from "./albumAdminThunk.ts";
import {Button} from "@mui/material";

interface Props {
    albums: Album;
}

const AlbumItem: React.FC<Props> = ({albums}) => {
const dispatch = useAppDispatch()


    const handleDelete = async() => {
        if (window.confirm('Do you want to delete item?')) {
            await dispatch(deleteAdminAlbum(albums._id));
        }
    }

    return (
        <div>
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
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                        Delete
                    </Button>
                </div>
        </div>
    );
};

export default AlbumItem;