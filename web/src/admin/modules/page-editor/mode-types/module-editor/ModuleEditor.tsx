import React from 'react';
import _ from 'lodash';
import {ModeRendererProps} from '../../index';

import buildAdminEditElement from './helpers/buildAdminEditElement';
import {PageItem} from '../../../page-tree/types';

import styles from './ModuleEditor.module.scss';
import getDescriptionByPath from './helpers/getDescriptionByPath';
import {regenerateState} from './helpers/regenerateState';

export default ({page, currentPageModuleIndex, currentModulePath, changePage, changeModulePath}: ModeRendererProps) => {
    if (!page) {
        return null;
    }

    const chosenPage = page as PageItem;

    const {state, meta, description} = chosenPage.content[currentPageModuleIndex];

    const currentState = _.get(chosenPage.content[currentPageModuleIndex].state, currentModulePath, {});
    const currentMeta = chosenPage.content[currentPageModuleIndex].meta;
    const currentDescription = getDescriptionByPath(chosenPage.content[currentPageModuleIndex].description, currentModulePath);

    console.log('------');
    console.log('STATE', state);
    console.log('PATH CURRENT', currentModulePath);
    const changeContent = (field: string, value: any) => {
        console.log('NEW STATE', value);
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
        console.log('CHANGE STATE', path, value, state);
        let targetPath = path;
        let targetValue = value;
        if (deleteItem) {
            const splitPath = path.split('.');
            const index = +splitPath[splitPath.length - 1];
            const arrayPath = splitPath.slice(0, splitPath.length - 1).join('.');
            targetPath = arrayPath;
            targetValue = _.get(state, arrayPath, []).filter((val: any, i: number) => i !== index);
        }
        console.log('TARGET PATH-VALUE', targetPath, targetValue)
        page && changeContent('state', _.setWith(_.clone(state || {}), targetPath, targetValue, _.clone));
    };

    const changeMeta = (path: string, value: any) => {
        page && changeContent('meta', _.setWith(_.clone(meta), path[0] === '' ? path.slice(1) : path, value, _.clone));
    };




    console.log('DESCR', currentDescription);

    return (
        <div className={styles.Editor}>
            {buildAdminEditElement({
                description: description,
                path: currentModulePath,
                state: state,
                meta: meta,
                changeState,
                changeMeta,
                changeModulePath
            })}
        </div>
    );
}
