import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getCompositionsByAlbum} from "../../store/thunks/compositionThunk/compositionThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CompositionItem from "../compositions/CompositionItem.tsx";

const AlbumCompositions = () => {
    const {albumId} = useParams();
    const dispatch = useAppDispatch();
    const compositions = useAppSelector((state) => state.compositions.compositions);
    const loading = useAppSelector((state) => state.compositions.isLoading);

    useEffect(() => {
        if (!albumId) {
            console.error("Album is not found");
            return;
        }
        dispatch(getCompositionsByAlbum(albumId));
    }, [albumId, dispatch]);

    if (!albumId) {
        return <p>Album is not found</p>;
    }

    return (
        <div>
            {loading && <Spinner/>}
            <h2>Compositions</h2>
            {compositions.length === 0 ? (
                <p>This album is empty yet</p>
            ) : (
                <ul>
                    {compositions.map((composition) => (
                        <li key={composition._id}>
                            <CompositionItem key={composition._id} composition={composition} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default AlbumCompositions;