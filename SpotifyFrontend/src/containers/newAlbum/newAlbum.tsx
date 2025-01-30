import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {addAlbum} from "../../store/thunks/albumThunk/albumThunk.ts";
import {AlbumMutation} from "../../types.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import AlbumForm from "../../components/forms/AlbumForm.tsx";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.albums.isLoading)
    const navigate = useNavigate();

   const handleSubmit = async(album: AlbumMutation) => {
       await dispatch(addAlbum(album)).unwrap();
       navigate('/')
   }

    return (
        <div>
            <h1>Add Album</h1>
            {loading ? <Spinner/>
            :
            <AlbumForm onSubmit={handleSubmit}/>
            }
        </div>
    );
};

export default NewAlbum;