import React from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import store from './store';
import { RootOptions } from './contexts';

import './App.scss';

type AppPropsType = {serverApi: string};

const App = ({ serverApi }: AppPropsType): JSX.Element => (
    <React.StrictMode>
        <Provider store={store}>
            <RootOptions.Provider value={{ serverApi }}>
                <Router />
            </RootOptions.Provider>
        </Provider>
    </React.StrictMode>
);

export default App;
