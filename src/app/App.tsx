import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FileTree from './components/FileTree';
import { ServerApi } from './types/props';

import './App.scss';

interface AppProps {
    serverApi: ServerApi,
}

const App = ({ serverApi }: AppProps) => {
    if (!serverApi) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="*">
                    <FileTree serverApi={serverApi} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
