import _ from 'lodash';
import {BaseModuleDescription, isArrayDescription, isInputDescription, isObjectDescription} from '../../../../types';

interface GenerateStateProps {
    path: string,
    description: BaseModuleDescription,
    state: any
}

export const regenerateState = ({description, path, state}: GenerateStateProps): any => {
    console.log('REG', description, path, state)
    if (isObjectDescription(description)) {
        return Object.keys(description.properties)
            .reduce((memo, key) => {
                const targetedPath = path === '' ? key : `${path}.${key}`;
                return {
                    ...memo, [key]: regenerateState({
                        path: targetedPath,
                        description: description.properties[key],
                        state
                    })
                };
            }, {});
    }

    if (isInputDescription(description)) {
        return _.get(state, path, description.defaultValue);
    }

    if (isArrayDescription(description)) {
        return _.get(state, path, [])
            .map((val: any, i: number) => {
                return regenerateState({
                    path: `${path}.${i}`,
                    description: description.item,
                    state
                });
            });
    }
    return null;
};
