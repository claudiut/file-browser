import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import './index.scss';

const appDomNode = document.getElementById('file-explorer');
const serverApi = appDomNode ? appDomNode.getAttribute('server-api') : null;

ReactDOM.render(<App serverApi={serverApi} />, appDomNode);
