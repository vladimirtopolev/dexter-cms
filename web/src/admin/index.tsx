import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './layout/Layout';

import Pages from './pages/pages';
import Navigation from './pages/navigation';

import './styles.scss';

export default () => {
    return (
        <Layout>
            <Switch>
                <Route component={Pages} path="/pages"/>
                <Route component={Navigation} path="/navigation"/>
            </Switch>
        </Layout>
    );
}
