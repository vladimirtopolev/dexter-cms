import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './client/routes';
import {renderRoutes} from 'react-router-config';


function App() {
    return (
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    );
}

export default App;
