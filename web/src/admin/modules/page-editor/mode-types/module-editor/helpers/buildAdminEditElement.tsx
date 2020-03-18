import React from 'react';
import {
    BaseModuleDescription,
    isArrayDescription,
    isImageDescription,
    isInputDescription,
    isObjectDescription
} from '../../../../types';
import ObjectValue from '../value-types/ObjectValue';
import InputValue from '../value-types/InputValue';
import ArrayValue from '../value-types/ArrayValue';
import ImageValue from '../value-types/image-value/ImageValue';


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
    if (isImageDescription(description)){
        return <ImageValue description={description} {...rest}/>
    }
    return null;
}
