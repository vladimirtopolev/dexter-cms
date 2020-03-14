import React from 'react';
import _ from 'lodash';
import {BaseModuleDescription, isArrayDescription, isInputDescription, isObjectDescription} from '../../types';
import WrappedUserView from './WrappedUserView';
import {componentMapper} from '../../../../user/component-mapper';

type BuildUserViewElementProps = {
    path: string,
    description: BaseModuleDescription,
    state: any,
    meta: any,
    changeModulePath: (newPath: string) => void
}

const buildUserViewElement = ({description, path, state, ...rest}: BuildUserViewElementProps): React.ReactNode => {
    if (isObjectDescription(description)) {
        if (description.component) {
            return <WrappedUserView Component={componentMapper[description.component]}
                                    path={path}
                                    state={state}
                                    renderChildrenComponents={() => {
                                        return Object.keys(description.properties)
                                            .map(key => {
                                                const targetedPath = path === '' ? key : `${path}.${key}`;
                                                return buildUserViewElement({
                                                    path: targetedPath,
                                                    state,
                                                    description: description.properties[key],
                                                    ...rest
                                                });
                                            });
                                    }}
                                    {...rest}
            />;
        }

        return Object.keys(description.properties)
            .map(key => {
                const targetedPath = path === '' ? key : `${path}.${key}`;
                return buildUserViewElement({
                    path: targetedPath,
                    state,
                    description: description.properties[key],
                    ...rest
                });
            });
    }

    if (isArrayDescription(description)) {
        if (description.component) {

        } else {
            return _.get(state, path, [])
                .map((val: any, i: number) => {
                    return buildUserViewElement({
                        path: `${path}.${i}`,
                        state,
                        description: description.item,
                        ...rest
                    });
                });
        }
    }

    if (isInputDescription(description) && description.component) {
        return <WrappedUserView Component={componentMapper[description.component]}
                                path={path}
                                state={state}
                                {...rest}/>;
    }
    return null;
};

export default buildUserViewElement;
