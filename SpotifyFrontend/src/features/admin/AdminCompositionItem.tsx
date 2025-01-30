import React from 'react';
import {Composition} from "../../types.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {addCompositionToHistory} from "../../store/thunks/compositionHistoryThunk/compositionHistoryThunk.ts";
import {deleteAdminComposition} from "./compositionAdminThunk.ts";
import {Button} from "@mui/material";

interface Props {
    composition: Composition;
}

const CompositionItem: React.FC<Props> = ({composition}) => {
    const dispatch = useAppDispatch();

    const playComposition = () => {
        console.log(dispatch(addCompositionToHistory(composition._id)).unwrap());
    }

    const handleDelete = async() => {
        if (window.confirm('Do you want to delete composition?')) {
            await dispatch(deleteAdminComposition(composition._id));
        }
    }
    return (
        <div>
            <div className='text-primary'>
                {composition.composition_number}
            </div>
            <h1>
                {composition.name}
            </h1>
            <p>
                {composition.timing}
            </p>
            <button onClick={playComposition}>
                Play
            </button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                Delete
            </Button>
        </div>
    );
};

export default CompositionItem;