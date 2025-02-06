import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {ArtistMutation} from "../../types.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {addArtist} from "../../store/thunks/artistThunk/artistThunk.ts";
import ArtistForm from "../../components/forms/ArtistForm.tsx";

const NewArtist = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.artists.isLoading)
    const navigate = useNavigate();

    const handleSubmit = async(artist: ArtistMutation) => {
        await dispatch(addArtist(artist)).unwrap();
        navigate('/')
    }

    return (
        <div>
            <h1>Add Album</h1>
            {loading ? <Spinner/>
                :
                <ArtistForm onSubmit={handleSubmit}/>
            }
        </div>
    );
};

export default NewArtist;