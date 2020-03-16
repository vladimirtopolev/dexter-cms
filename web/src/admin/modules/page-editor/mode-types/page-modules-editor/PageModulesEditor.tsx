import React from 'react';

import {ModeRendererProps} from '../../index';
import Input from '../../../../components/common/Input';
import ModuleEditor from './modules/module-editor/ModuleEditor';

import styles from './PageModulesEditor.module.scss';

export default ({page, changePage, changeMode, changePageModuleIndex }: ModeRendererProps) => {
    const changePageFiled = (name: string) => (val: any) => {
        if (page) {
            changePage({...page, [name]: val});
        }
    };

    return (
        <div className={styles.Editor}>
            {page && <Input value={page.title}
                            label="Заголовок"
                            onChange={changePageFiled('title')}
                            name="title"/>}
            {page && page.path}
            <ModuleEditor page={page}
                          changePage={changePage}
                          changeMode={changeMode}
                          changePageModuleIndex={changePageModuleIndex}
            />
        </div>
    );
}
