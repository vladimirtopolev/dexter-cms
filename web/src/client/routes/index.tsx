import React from 'react';
import Admin from '../../admin/index'
import PageView from '../pages/PageRenderer';
import PageRenderer from '../pages/PageRenderer';

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
