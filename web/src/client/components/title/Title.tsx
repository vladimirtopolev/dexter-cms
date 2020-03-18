import React from 'react';
import {BaseUserComponentProps} from '../component-mapper';

export const Title: React.FC<BaseUserComponentProps> = ({state, style, renderChildrenComponents, ...rest}) => {
    //console.log(state)
    return (
        <div {...rest} style={{...style, padding: '10px'}}>
            Title: {JSON.stringify(state)}
        </div>
    );
};
