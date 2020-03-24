import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import * as actions from '../../api';
import {PageItem} from '../../../admin/modules/page-tree/types';
import ModuleRenderer from './components/ModuleRenderer';
import {regenerateState} from '../../../admin/modules/page-editor/mode-types/module-editor/helpers/regenerateState';

export default (props: any) => {

    const location = useLocation();
    const [page, changePage] = useState<PageItem>();

    useEffect(() => {
        actions.getPageByPath(location.pathname)
            .then(page => {
                changePage(page);
            });
    }, [location.pathname]);

    useEffect(() => {
        const messageHandler = (e: any) => {
            console.log('E')
            changePage(e.detail.page);
        };
        window.addEventListener('custom', messageHandler);
        return () => window.removeEventListener('custom', messageHandler);
    });
    return (
        <div>
            {page && page.content && page.content.map((module, i) => {
                return <ModuleRenderer path=''
                                       key={i}
                                       description={module.description}
                                       state={regenerateState({
                                           description: module.description,
                                           path: '',
                                           state: module.state
                                       })}
                                       meta={module.meta}/>;
            })}
        </div>
    );
}
