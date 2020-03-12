import React from 'react';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layout/Layout';

import PagesTree from './pages/pages-tree';
import PagesEditor from './pages/pages-editor';

import Navigation from './pages/navigation';

import './styles.scss';

export default () => {
    return (
        <Layout>
            <Switch>
                <Route component={PagesTree} path="/pages-tree"/>
                <Route component={PagesEditor} path="/pages/:id"/>
                <Route component={Navigation} path="/navigation"/>
            </Switch>
        </Layout>
    );
}
