import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './app/App';

import './index.scss';

const appDomNode = document.getElementById('app');

const serverApi = appDomNode && appDomNode.getAttribute('server-api');

ReactDOM.render(
    <React.StrictMode>
        {serverApi && (
            <Provider store={store}>
                <App serverApi={serverApi} />
            </Provider>
        )}
        {!serverApi && 'Please add "server-api" html attribute to the "#app" element'}
    </React.StrictMode>,
    appDomNode,
);