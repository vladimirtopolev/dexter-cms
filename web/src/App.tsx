import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './client/routes';
import {renderRoutes} from 'react-router-config';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    );
}

export default App;
