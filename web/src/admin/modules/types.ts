import React from 'react';

export interface BaseModuleDescription {
    type: string,
    component?: React.ComponentClass<any, any> | React.FunctionComponent<any>,
    title?: string,
    [extraProps: string]: any
}

export interface BasePageModule {
    title: string,
    description: BaseModuleDescription
}

export interface PageModule extends BasePageModule{
    id: any,
    state: any
}
