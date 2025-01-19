import React from 'react';
import {Composition} from "../../types.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {addCompositionToHistory} from "../../store/thunks/compositionHistoryThunk/compositionHistoryThunk.ts";

interface Props {
    composition: Composition;
}

const CompositionItem: React.FC<Props> = ({composition}) => {
    const dispatch = useAppDispatch();

    const playComposition = () => {
        console.log(dispatch(addCompositionToHistory(composition._id)).unwrap());

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
        </div>
    );
};

export default CompositionItem;