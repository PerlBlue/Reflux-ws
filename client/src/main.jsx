import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import Ws from './dao/Ws.js';

import '../css/style.css';

window.onload = () => {
    const ws = new Ws();

    ReactDOM.render(
        <List />,
        document.getElementById('list')
    );
};
