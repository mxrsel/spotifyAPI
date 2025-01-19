import React from 'react';
import { CompositionHistoryTypes} from "../../types.ts";

interface Props {
    composition: CompositionHistoryTypes;
}

const HistoryItem: React.FC<Props> = ({composition}) => {
    return (
        <div>
            <h1>
                {composition.composition.name}
            </h1>
            <p>
                {composition.composition.timing}
            </p>
            <p className='text-primary'>
                {composition.datetime}
            </p>
        </div>
    );
};

export default HistoryItem;