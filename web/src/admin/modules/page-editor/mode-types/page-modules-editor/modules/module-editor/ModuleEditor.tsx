import React, {useState} from 'react';
import ModalView from './components/ModalViewPageModuleDescription';
import PageModuleRenderer from './components/PageModuleRenderer';
import {BasePageModule, PageModule} from '../../../../../types';
import {PageItem} from '../../../../../page-tree/types';
import {v1 as uuidv1} from 'uuid';
import Button from '../../../../../../components/common/Button';

type ModuleEditorProps = {
    page: PageItem | undefined,
    changePage: (page: PageItem | ((page: (PageItem | undefined)) => PageItem | undefined)) => void
}
export default ({changePage, page}: ModuleEditorProps) => {
    const [isOpen, changeModalState] = useState(false);
    const toggle = () => changeModalState(!isOpen);

    const getPageContent = () => {
        return (!page || !page.content) ? [] : page.content;
    };

    const addModuleToPage = (moduleDescription: BasePageModule) => {
        page && changePage({
            ...page,
            content: getPageContent().concat({
                ...moduleDescription,
                id: uuidv1(),
                state: null
            })
        });
        toggle();
    };

    const changePageModule = (pageModules: PageModule[]) => {
        page && changePage({
            ...page,
            content: pageModules
        })
    };

    return (
        <div>
            <Button onClick={() => toggle()}>Add module</Button>
            <ModalView isOpen={isOpen}
                       toggle={toggle}
                       addModuleToPage={addModuleToPage}/>
            <PageModuleRenderer pageModules={getPageContent()}
                                changePageModules={changePageModule}/>
        </div>
    );
}
