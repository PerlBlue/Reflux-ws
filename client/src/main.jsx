import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import '../css/style.css';
import Websocket from './dao/Websocket';

window.onload = () => {
	const websocket = new Websocket();

    ReactDOM.render(
        <List />,
        document.getElementById('list')
    );
};
