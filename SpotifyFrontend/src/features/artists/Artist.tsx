import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getAllArtists} from "../../store/thunks/artistThunk/artistThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ArtistsItem from "./ArtistsItem.tsx";

const Artist = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector((state) => state.artists.artists);
    const loading = useAppSelector((state) => state.artists.isLoading);

    useEffect(() => {
        dispatch(getAllArtists());
    }, [dispatch]);

    return (
        <div>
            {loading && <Spinner/>}
            <ul>
            {artists.map((artist) => (
                <ArtistsItem
                    key={artist._id}
                    artist={artist}
                    artistId={artist._id}
                />
            ))}
            </ul>
        </div>
    );
};

export default Artist;