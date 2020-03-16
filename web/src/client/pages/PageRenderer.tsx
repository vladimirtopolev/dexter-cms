import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import * as actions from '../api';
import {PageItem} from '../../admin/modules/page-tree/types';

export default (props: any) => {

    const location = useLocation();
    const [page, changePage] = useState<PageItem>();

    useEffect(() => {
        actions.getPageByPath<PageItem>(location.pathname)
            .then(page => {
                console.log(page);
                changePage(page);
            });
    }, [location.pathname]);
    return (
        <div>
            PAGE
        </div>
    );
}
