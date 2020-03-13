import React from 'react';
import buildAdminEditElement, {BuildAdminEditElementProps} from '../helpers/buildAdminEditElement';
import {ObjectDescription} from '../../../../types';

interface ObjectValueComponentProps extends BuildAdminEditElementProps {
    description: ObjectDescription
}

const ObjectValue = ({
                         path,
                         description,
                         state,
                         ...rest
                     }: ObjectValueComponentProps) => {
    return (
        <div>
            <div>
                {Object.keys(description.properties)
                    .map(key => {
                        const targetPath = path === '' ? key : `${path}.${key}`;
                        return (
                            <div key={targetPath}>
                                {buildAdminEditElement({
                                    path: targetPath,
                                    description: description.properties[key],
                                    state,
                                    ...rest
                                })}
                            </div>);
                    })}
            </div>
        </div>
    );
};

export default ObjectValue;
