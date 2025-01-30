import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import AdminArtistItem from "./AdminArtistItem.tsx";
import {getAllArtistsForAdmin} from "./artistAdminThunk.ts";

const AdminArtistList = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector((state) => state.artists.artists);
    const loading = useAppSelector((state) => state.artists.isLoading);

    useEffect(() => {
        dispatch(getAllArtistsForAdmin());
    }, [dispatch]);

    return (
        <div>
            {loading && <Spinner/>}
            <ul>
                {artists.map((artist) => (
                    <AdminArtistItem
                        key={artist._id}
                        artist={artist}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AdminArtistList;