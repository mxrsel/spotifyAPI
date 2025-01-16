import React from 'react';
import {Composition} from "../../types.ts";

interface Props {
    composition: Composition;
}

const CompositionItem: React.FC<Props> = ({composition}) => {
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
        </div>
    );
};

export default CompositionItem;