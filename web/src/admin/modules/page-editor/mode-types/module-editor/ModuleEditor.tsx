import React from 'react';
import _ from 'lodash';
import {ModeRendererProps} from '../../index';

import buildAdminEditElement from './helpers/buildAdminEditElement';
import {PageItem} from '../../../page-tree/types';

import styles from './ModuleEditor.module.scss';
import getDescriptionByPath from './helpers/getDescriptionByPath';

export default ({page, currentPageModuleIndex, currentModulePath, changePage, changeModulePath, backToPevNavigationStep}: ModeRendererProps) => {
    if (!page) {
        return null;
    }
    const chosenPage = page as PageItem;

    const {state, meta, description} = chosenPage.content[currentPageModuleIndex];
    const currentState = currentModulePath === '' ?
        chosenPage.content[currentPageModuleIndex].state
        : _.get(chosenPage.content[currentPageModuleIndex].state, currentModulePath);

    const currentMeta = chosenPage.content[currentPageModuleIndex].meta;
    const currentDescription = getDescriptionByPath(chosenPage.content[currentPageModuleIndex].description, currentModulePath);

    const changeContent = (field: string, value: any) => {
        changePage((page) => {
            if (!page) return page;
            return {
                ...page,
                content: page.content.map((val, i) => i === currentPageModuleIndex
                    ? {...val, [field]: value}
                    : val)
            };
        });
    };
    const changeState = (path: string, value: any, deleteItem?: boolean) => {
        let targetPath = currentModulePath === '' ? path : [currentModulePath, path].join('.');
        let targetValue = value;
        if (deleteItem) {
            const splitPath = (currentModulePath === '' ? path : [currentModulePath, path].join('.')).split('.');
            const index = +splitPath[splitPath.length - 1];
            const arrayPath = splitPath.slice(0, splitPath.length - 1).join('.');
            targetPath = arrayPath;
            targetValue = _.get(state, arrayPath, []).filter((val: any, i: number) => i !== index);
        }
        const newVAL = _.setWith(_.clone(state || {}), targetPath, targetValue, _.clone);
        page && changeContent('state', newVAL);
    };

    const changeMeta = (path: string, value: any) => {
        page && changeContent('meta', _.setWith(_.clone(meta), path[0] === '' ? path.slice(1) : path, value, _.clone));
    };

    return (
        <div className={styles.Editor}>
            {buildAdminEditElement({
                nestedLevel: 0,
                backToPevNavigationStep,
                description: currentDescription,
                path: '',
                state: currentState,
                meta: meta,
                changeState,
                changeMeta,
                changeModulePath: (path: string) => changeModulePath(currentModulePath === ''
                    ? path : [currentModulePath, path].join('.'))
            })}
        </div>
    );
}
