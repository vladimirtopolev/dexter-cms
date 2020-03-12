import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Toolbar from './components/Toolbar';
import {PageItem} from '../page-tree/types';
import styles from './styles.module.scss';
import * as actions from '../page-tree/actions';


import PageModulesEditor from './mode-types/page-modules-editor/PageModulesEditor';

export type ModeRendererProps = {
    mode: string,
    page: PageItem | undefined,
    changePage: (page: PageItem | ((page: (PageItem | undefined)) => PageItem | undefined)) => void
}

const getModeRenderer = ({mode, ...rest}: ModeRendererProps) => {
    if (mode === 'page-modules-editor') {
        return <PageModulesEditor mode={mode} {...rest}/>;
    }
};

export default (props: any) => {
    const params = useParams<{ id: string }>();

    const [page, changePage] = useState<PageItem>();
    const [mode] = useState<string>('page-modules-editor');

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
                        {getModeRenderer({mode, page, changePage})}
                    </Toolbar>
                </div>
                <div className={styles.PageEditor__content}>Content</div>
            </div>
        </div>
    );
}
