import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import AdminAlbumItem from "./AdminAlbumItem.tsx";
import {getAllAlbumsForAdmin} from "./albumAdminThunk.ts";

const AdminAlbumList = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector((state) => state.albums.albums);
    const loading = useAppSelector((state) => state.artists.isLoading);

    useEffect(() => {
        dispatch(getAllAlbumsForAdmin());
    }, [dispatch]);

    return (
        <div>
            {loading && <Spinner/>}
            <ul>
                {albums.map((album) => (
                    <AdminAlbumItem
                        key={album._id}
                        albums={album}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AdminAlbumList;