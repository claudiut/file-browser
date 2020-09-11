import React from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import store from './store';
import { RootOptions } from './contexts';

import './App.scss';

type AppPropsType = {serverApi: string|null};

const App = ({ serverApi }: AppPropsType): JSX.Element => (
    <React.StrictMode>
        {serverApi
            ? (
                <Provider store={store}>
                    <RootOptions.Provider value={{ serverApi }}>
                        <Router />
                    </RootOptions.Provider>
                </Provider>
            )
            : 'Please add "server-host" html attribute to the "#app" element'}
    </React.StrictMode>
);

export default App;
