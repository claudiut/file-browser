import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FileTree from './components/FileTree';

import './App.scss';

interface AppProps {
    serverApi: string,
}

const App = ({ serverApi }: AppProps): JSX.Element => (
    <BrowserRouter>
        <Switch>
            <Route path="*">
                <FileTree serverApi={serverApi} />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
