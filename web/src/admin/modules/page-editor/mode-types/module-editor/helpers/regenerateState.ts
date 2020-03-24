import _ from 'lodash';
import {
    BaseModuleDescription,
    isArrayDescription,
    isInputDescription,
    isLinkDescription,
    isObjectDescription
} from '../../../../types';
import {LINK_TARGETS, LINK_TYPES} from '../value-types/link-value/LinkValue';

interface GenerateStateProps {
    path: string,
    description: BaseModuleDescription,
    state: any
}

export const regenerateState = ({description, path, state}: GenerateStateProps): any => {
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

    if (isLinkDescription(description)){
        return _.get(state, path, {
            type: LINK_TYPES.INTERNAL,
            value: '/',
            target: LINK_TARGETS.SAME_WINDOW
        });
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
    return _.get(state, path);
};
