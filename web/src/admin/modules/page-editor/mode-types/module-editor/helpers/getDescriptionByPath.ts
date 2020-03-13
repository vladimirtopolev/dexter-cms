import {BaseModuleDescription, isArrayDescription, isObjectDescription} from '../../../../types';


function getDescriptionByPath(description: BaseModuleDescription, path: string): BaseModuleDescription {
    const [handledPart, ...rest] = path.split('.');
    if (handledPart === '') {
        return description;
    }
    if (isObjectDescription(description)) {
        return getDescriptionByPath(description.properties[handledPart], rest.join('.'));
    }
    if (isArrayDescription(description)) {
        const [index, ...restArray] = rest;
        return getDescriptionByPath(description.item, restArray.join('.'))
    }
    return description;
}

export default getDescriptionByPath;
