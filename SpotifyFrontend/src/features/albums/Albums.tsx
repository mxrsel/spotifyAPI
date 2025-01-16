import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getAllAlbums} from "../../store/thunks/albumThunk/albumThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import AlbumItem from "./AlbumItem.tsx";

const Albums = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector((state) => state.albums.albums);
    const loading = useAppSelector((state) => state.albums.isLoading);


    useEffect(() => {
        dispatch(getAllAlbums());
    }, [dispatch]);
    return (
        <div>
            {loading && <Spinner/>}
            {albums.map((album) => (
                <AlbumItem
                    key={album._id}
                    albums={album}
                />
            ))}
        </div>
    );
};

export default Albums;