import React from 'react';
import {BaseUserComponentProps} from '../component-mapper';

export const User: React.FC<BaseUserComponentProps> = ({state, style, renderChildrenComponents, ...rest}) => {
    //console.log(state)
    return (
        <div {...rest} style={{...style, padding: '10px'}}>
            USER component {JSON.stringify(state)}
            {renderChildrenComponents && renderChildrenComponents()}
        </div>
    );
};
