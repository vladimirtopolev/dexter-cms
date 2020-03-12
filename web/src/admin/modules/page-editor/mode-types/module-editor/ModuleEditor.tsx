import React from 'react';
import _ from 'lodash';
import {ModeRendererProps} from '../../index';

import buildAdminEditElement from './helpers/buildAdminEditElement';
import {PageItem} from '../../../page-tree/types';

import styles from './ModuleEditor.module.scss';

export default ({page, currentPageModuleIndex, currentPathModule, changePage}: ModeRendererProps) => {
    const chosenPage = page as PageItem;

    const {state, meta} = chosenPage.content[currentPageModuleIndex];

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
        let targetPath = path;
        let targetValue = value;
        if (deleteItem) {
            const splitPath = path.split('.');
            const index = +splitPath[splitPath.length - 1];
            const arrayPath = splitPath.slice(0, splitPath.length - 1).join('.');
            targetPath = arrayPath;
            targetValue = _.get(state, arrayPath, []).filter((val: any, i: number) => i !== index);
        }
        page && changeContent('state', _.setWith(_.clone(state), targetPath, targetValue, _.clone));
    };

    const changeMeta = (path: string, value: any) => {
        page && changeContent('meta',  _.setWith(_.clone(meta), path[0] === '' ? path.slice(1) : path, value, _.clone))
    };

    return (
        <div className={styles.Editor}>
            {buildAdminEditElement({
                description: chosenPage.content[currentPageModuleIndex].description,
                path: currentPathModule,
                state,
                meta,
                changeState,
                changeMeta
            })}
        </div>
    );
}
