import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';

import './index.scss';
import store from './store';

const appDomNode = document.getElementById('file-explorer');

if (appDomNode) {
    const serverApi = appDomNode.getAttribute('server-api');

    ReactDOM.render(
        <React.StrictMode>
            {serverApi && (
                <Provider store={store}>
                    <App serverApi={serverApi} />
                </Provider>
            )}
            {!serverApi && 'Please add "server-host" html attribute to the "#app" element'}
        </React.StrictMode>,
        appDomNode,
    );
}
