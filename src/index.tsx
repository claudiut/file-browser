import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import './index.scss';

const appDomNode = document.getElementById('file-explorer');

if (appDomNode) {
    const serverApi = appDomNode.getAttribute('server-api');

    ReactDOM.render(
        <React.StrictMode>
            {serverApi && <App serverApi={serverApi} />}
            {!serverApi && 'Please add "server-host" html attribute to the "#app" element'}
        </React.StrictMode>,
        appDomNode,
    );
}
