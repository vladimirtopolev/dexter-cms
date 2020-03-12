import _ from 'lodash';
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
    //const checkboxValue = _.get(meta, `${path}.enabled`, true);
    console.log(description);
    return (
        <div>
            {/*}
            <div>
                Object
                <input type="checkbox" value={checkboxValue}
                       onChange={() => changeMeta(`${path}.enabled`, !checkboxValue)}/>
            </div>
            */}
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
