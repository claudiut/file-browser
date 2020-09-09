import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FileTree from './components/FileTree';

import './App.scss';

const App = (): JSX.Element => (
    <BrowserRouter>
        <Switch>
            <Route path="*">
                <FileTree />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
