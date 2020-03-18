import React from 'react';
import Admin from '../../admin/index'
import PageView from '../pages/page-renderer/PageRenderer';
import PageRenderer from '../pages/page-renderer/PageRenderer';

export default [
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/',
        component: PageRenderer
    }
];
