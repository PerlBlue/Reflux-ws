import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import '../css/style.css';

window.onload = () => {
    ReactDOM.render(
        <List />,
        document.getElementById('list')
    );
};
