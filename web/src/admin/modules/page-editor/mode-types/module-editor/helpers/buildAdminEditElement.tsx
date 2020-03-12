import React from 'react';
import {BaseModuleDescription, isArrayDescription, isInputDescription, isObjectDescription} from '../../../../types';
import ObjectValue from '../components/ObjectValue';
import InputValue from '../components/InputValue';
import ArrayValue from '../components/ArrayValue';


export type BuildAdminEditElementProps = {
    path: string,
    description: BaseModuleDescription,
    state: any,
    meta: any,
    changeState: (path: string, value: any, deleteItem?: boolean) => void,
    changeMeta: (path: string, value: any) => void
};

export default ({description, ...rest}: BuildAdminEditElementProps) => {
    console.log(description);
    if (isObjectDescription(description)) {
        return <ObjectValue description={description} {...rest}/>
    }
    if (isInputDescription(description)){
        return <InputValue description={description} {...rest}/>
    }

    return null;
}
