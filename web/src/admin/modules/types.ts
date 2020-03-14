import React from 'react';

export interface BaseModuleDescription {
    type: string,
    component?: string,
    title?: string,
    [extraProps: string]: any
}

export interface BasePageModule {
    title: string,
    description: BaseModuleDescription
}

export interface PageModule extends BasePageModule{
    id: any,
    state: any,
    meta: any
}


// Descendants of BaseModuleDescription
export interface ObjectDescription extends BaseModuleDescription {
    type: 'object',
    properties: { [KEY: string]: BaseModuleDescription }
}

export interface InputDescription extends BaseModuleDescription{
    type: 'input',
    title: string,
    defaultValue: any
}

export interface ArrayDescription extends BaseModuleDescription{
    type: 'array',
    item: BaseModuleDescription
}

// function which cast to particular class of BaseModeDescription
export function isObjectDescription(description: BaseModuleDescription): description is ObjectDescription {
    return description.type === 'object';
}
export function isInputDescription(description: BaseModuleDescription): description is InputDescription {
    return description.type === 'input';
}

export function isArrayDescription(description: BaseModuleDescription): description is ArrayDescription {
    return description.type === 'array';
}



