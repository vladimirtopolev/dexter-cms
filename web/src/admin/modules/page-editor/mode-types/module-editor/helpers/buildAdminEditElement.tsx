import React from 'react';
import {BaseModuleDescription, isArrayDescription, isInputDescription, isObjectDescription} from '../../../../types';
import ObjectValue from '../components/ObjectValue';
import InputValue from '../components/InputValue';
import ArrayValue from '../components/ArrayValue';


export type BuildAdminEditElementProps = {
    nestedLevel: number,
    path: string,
    description: BaseModuleDescription,
    state: any,
    meta: any,
    changeState: (path: string, value: any, deleteItem?: boolean) => void,
    changeMeta: (path: string, value: any) => void,
    changeModulePath: (newPath: string) => void,
    backToPevNavigationStep: () => void
}

export default ({description, ...rest}: BuildAdminEditElementProps) => {
    if (isObjectDescription(description)) {
        return <ObjectValue description={description} {...rest}/>;
    }
    if (isInputDescription(description)) {
        return <InputValue description={description} {...rest}/>;
    }
    if (isArrayDescription(description)) {
        return <ArrayValue description={description} {...rest}/>;
    }
    return null;
}
