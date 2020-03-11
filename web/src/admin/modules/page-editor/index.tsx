import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {PageItem} from '../page-tree/types';
import styles from './styles.module.scss';
import * as actions from '../page-tree/actions';


import PageModulesEditor from './mode-types/page-modules-editor/PageModulesEditor';

type ModeRendererProps = {
    mode: string,
    page: PageItem
}

const getModeRenderer = ({mode, ...rest}: ModeRendererProps) => {
    if (mode === 'page-modules-editor') {
        return <PageModulesEditor/>
    }
}

export default (props: any) => {
    const params = useParams<{ id: string }>();

    const [page, changePage] = useState<PageItem | null>();
    const [mode, changeMode] = useState<string>('page-modules-editor');

    useEffect(() => {
        actions.getPage<PageItem>(params.id, (page) => {
            changePage(page);
        })
    }, [params.id]);

    return (
        <div className={styles.PageEditor}>
            <div className={styles.PageEditor__toolbar}>Toolbar</div>
            <div className={styles.PageEditor__wrapper}>
                <div className={styles.PageEditor__menu}>Menu</div>
                <div className={styles.PageEditor__content}>Content</div>
            </div>
        </div>
    );
}
