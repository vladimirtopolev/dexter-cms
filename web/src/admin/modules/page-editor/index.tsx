import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Toolbar from './components/Toolbar';
import Button from '../../components/common/Button';
import {PageItem} from '../page-tree/types';
import * as actions from '../page-tree/actions';

import PageModulesEditor from './mode-types/page-modules-editor/PageModulesEditor';
import ModuleEditor from './mode-types/module-editor/ModuleEditor';

import styles from './styles.module.scss';

export enum EDIT_MODE {
    PAGE_MODULES_EDITOR,
    MODULE_EDITOR,

}

type NavigationStep = {
    mode: EDIT_MODE,
    path: string
}

export type ModeRendererProps = {
    mode: EDIT_MODE,
    page: PageItem | undefined,
    pagePath: string | undefined,
    currentPageModuleIndex: number,
    currentModulePath: string,
    changePage: (page: PageItem | ((page: (PageItem | undefined)) => PageItem | undefined)) => void,
    changePageModuleIndex: (index: number) => void,
    changeMode: (mode: EDIT_MODE) => void,
    changeModulePath: (newPath: string) => void,
    backToPevNavigationStep: () => void
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

    const [historyNavigation, changeHistoryNavigation] = useState<NavigationStep[]>([{
        mode: EDIT_MODE.PAGE_MODULES_EDITOR,
        path: ''
    }]);

    const [page, changePage] = useState<PageItem>();
    const [pagePath, changePagePath] = useState<string>();
    const [mode, changeModeHandler] = useState<EDIT_MODE>(EDIT_MODE.PAGE_MODULES_EDITOR);
    const [currentPageModuleIndex, changePageModuleIndex] = useState<number>(0);
    const [currentModulePath, changeModulePathHandler] = useState<string>('');

    const changeModulePath = (path: string) => {
        changeModulePathHandler(path);
        changeHistoryNavigation([...historyNavigation, {path, mode}]);
    };

    const changeMode = (mode: EDIT_MODE) => {
        changeModeHandler(mode);
        changeHistoryNavigation([...historyNavigation, {mode, path: currentModulePath}]);
    };

    const backToPrevNavigationStep = () => {
        const newHistory = historyNavigation.slice(0, historyNavigation.length - 1);
        const newNavigationItem = newHistory[newHistory.length - 1];
        changeHistoryNavigation(newHistory);
        changeModulePathHandler(newNavigationItem.path);
        changeModeHandler(newNavigationItem.mode);
    };


    useEffect(() => {
        actions.getPage<PageItem>(params.id)
            .then(page => {
                changePage(page);
                return actions.getPagePath(page._id);
            })
            .then(path => {
                changePagePath(path);
            });
    }, [params.id]);

    return (
        <div className={styles.PageEditor}>
            <div className={styles.PageEditor__toolbar}>
                <Button onClick={() => {
                    page && actions.updatePage(page._id, page);
                }}>
                    Сохранить страницу
                </Button>
            </div>
            <div className={styles.PageEditor__wrapper}>
                <div className={styles.PageEditor__menu}>
                    <Toolbar>
                        <ModeRenderer mode={mode}
                                      page={page}
                                      pagePath={pagePath}
                                      currentPageModuleIndex={currentPageModuleIndex}
                                      currentModulePath={currentModulePath}
                                      changePage={changePage}
                                      changeMode={changeMode}
                                      changePageModuleIndex={changePageModuleIndex}
                                      changeModulePath={changeModulePath}
                                      backToPevNavigationStep={backToPrevNavigationStep}
                        />
                    </Toolbar>
                </div>
                <div className={styles.PageEditor__content}>
                    <div className={styles.UserView}>
                        <div className={styles.UserView__header}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
