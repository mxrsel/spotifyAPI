import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {CompositionMutation} from "../../types.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {addComposition} from "../../store/thunks/compositionThunk/compositionThunk.ts";
import CompositionForm from "../../components/forms/CompositionForm.tsx";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.compositions.compositions)
    const navigate = useNavigate();

    const handleSubmit = async(composition: CompositionMutation) => {
        await dispatch(addComposition(composition)).unwrap();
        navigate('/')
    }

    return (
        <div>
            <h1>Add Album</h1>
            {loading ? <Spinner/>
                :
                <CompositionForm onSubmit={handleSubmit}/>
            }
        </div>
    );
};

export default NewAlbum;