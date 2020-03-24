import React, {ReactNode} from 'react';
import {
    BaseModuleDescription,
    isArrayDescription,
    isInputDescription,
    isObjectDescription
} from '../../../../admin/modules/types';
import {componentMapper} from '../../../components/component-mapper';
import _ from 'lodash';

type ModuleRendererProps = {
    path: string,
    description: BaseModuleDescription,
    state: any,
    meta: any,
}

const ModuleRenderer: React.ComponentType<ModuleRendererProps> = ({description, path, state, ...rest}: ModuleRendererProps) => {
    if (isObjectDescription(description)) {
        const processObjectKeys = (): ReactNode => {
            return Object.keys(description.properties)
                .map(key => {
                    return <ModuleRenderer
                        key={key}
                        path={''}
                        state={state[key]}
                        description={description.properties[key]}
                        {...rest}/>;
                });
        };

        if (description.component) {
            const Component = componentMapper[description.component];

            return <Component path={''}
                              state={state}
                              renderChildrenComponents={processObjectKeys}/>;
        }

        return processObjectKeys();
    }

    if (isArrayDescription(description)) {
        if (description.component) {

        } else {
            return state
                .map((val: any, i: number) => {
                    return <ModuleRenderer path={''}
                                           key={i}
                                           state={state[i]}
                                           description={description.item}
                                           {...rest}/>;
                });
        }
    }

    if (isInputDescription(description) && description.component) {
        const Component = componentMapper[description.component];
        return <Component path={path}
                          state={state}
                          {...rest}/>;
    }
    return null;
};

export default ModuleRenderer;
