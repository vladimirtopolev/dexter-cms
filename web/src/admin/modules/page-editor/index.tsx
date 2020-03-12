import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Toolbar from './components/Toolbar';
import {PageItem} from '../page-tree/types';
import styles from './styles.module.scss';
import * as actions from '../page-tree/actions';


import PageModulesEditor from './mode-types/page-modules-editor/PageModulesEditor';
import ModuleEditor from './mode-types/module-editor/ModuleEditor';

export enum EDIT_MODE {
    PAGE_MODULES_EDITOR,
    MODULE_EDITOR,

}

export type ModeRendererProps = {
    mode: EDIT_MODE,
    page: PageItem | undefined,
    currentPageModuleIndex: number,
    currentPathModule: string,
    changePage: (page: PageItem | ((page: (PageItem | undefined)) => PageItem | undefined)) => void,
    changePageModuleIndex: (index: number) => void,
    changeMode: (mode: EDIT_MODE) => void
}


const ModeRenderer = ({mode, ...rest}: ModeRendererProps) => {
    return (
        <React.Fragment>
            {mode === EDIT_MODE.PAGE_MODULES_EDITOR && <PageModulesEditor mode={mode} {...rest}/>}
            {mode === EDIT_MODE.MODULE_EDITOR && <ModuleEditor mode={mode} {...rest}/>}
        </React.Fragment>
    );
};

export default (props: any) => {
    const params = useParams<{ id: string }>();

    const [page, changePage] = useState<PageItem>();
    const [mode, changeMode] = useState<EDIT_MODE>(EDIT_MODE.PAGE_MODULES_EDITOR);
    const [currentPageModuleIndex, changePageModuleIndex] = useState<number>(0);
    const [currentPathModule, changeCurrentPathModule] = useState<string>('');

    useEffect(() => {
        actions.getPage<PageItem>(params.id, (page) => {
            changePage(page);
        });
    }, [params.id]);

    return (
        <div className={styles.PageEditor}>
            <div className={styles.PageEditor__toolbar}>
                <button onClick={() => {
                    page && actions.updatePage(page._id, page);
                }}>Сохранить страницу
                </button>
            </div>
            <div className={styles.PageEditor__wrapper}>
                <div className={styles.PageEditor__menu}>
                    <Toolbar>
                        <ModeRenderer mode={mode}
                                      page={page}
                                      currentPageModuleIndex={currentPageModuleIndex}
                                      changeMode={changeMode}
                                      changePageModuleIndex={changePageModuleIndex}
                                      changePage={changePage}
                                      currentPathModule={currentPathModule}/>

                    </Toolbar>
                </div>
                <div className={styles.PageEditor__content}>Content</div>
            </div>
        </div>
    );
}
