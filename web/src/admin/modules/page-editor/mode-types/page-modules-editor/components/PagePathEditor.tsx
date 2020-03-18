import React, {useState} from 'react';
import cn from 'classnames';
import {PageItem} from '../../../../page-tree/types';
import styles from './PagePathEditor.module.scss';

export default ({pagePath, page, changePage}: {
    pagePath: string, page: PageItem, changePage: (page: PageItem | ((page: (PageItem | undefined)) => PageItem | undefined)) => void,
}) => {
    const parentPath = pagePath.split('/')
        .filter((p, i, parts) => i !== parts.length - 1)
        .join('/').concat('/');

    const [isEditMode, editMode] = useState(false);
    return (
        <div className={styles.Editor}>
            <label className={styles.Editor__label}>Путь страницы</label>
            <div className={styles.Editor__contentWrapper}>
                <div className={styles.Editor__unchangablePath}>
                    {parentPath}
                </div>
                <div className={cn(styles.Editor__inputWrapper, {
                    [styles.Editor__inputWrapper_edit]: isEditMode
                })}>
                    <div className={styles.Editor__staticValue}>{page.path}</div>
                    <div className={styles.Editor__editorialValue}>
                        <input
                            type="text"
                            className={styles.Editor__input}
                            value={page.path}
                            onChange={(e) => {
                                changePage({...page, path: e.target.value});
                            }}/>
                    </div>
                    <div className={styles.Editor__toolbar}>
                        <button onClick={() => editMode(!isEditMode)}><i className="far fa-edit"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
