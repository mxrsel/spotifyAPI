import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getArtistAlbumsById} from "../../store/thunks/albumThunk/albumThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useParams} from "react-router-dom";
import AlbumItem from "../albums/AlbumItem.tsx";

const ArtistAlbums = () => {
    const { artistId } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector((state) => state.albums.albums);
    const loading = useAppSelector((state) => state.albums.isLoading);

    useEffect(() => {
        if (!artistId) {
            console.error("Artist not found");
            return;
        }
        dispatch(getArtistAlbumsById(artistId));
    }, [artistId, dispatch]);

    useEffect(() => {
        console.log(albums)
    }, [albums]);

    if (!artistId) {
        return <p>Artist is not found</p>;
    }

    return (
        <div>
            {loading && <Spinner/>}
            <h2>Albums</h2>
            {albums.length === 0 ? (
                <p>This artist doesn't have any albums yet.</p>
            ) : (
                <ul>
                    {albums.map((album) => (
                        <AlbumItem
                            key={album._id}
                            albums={album}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArtistAlbums;
