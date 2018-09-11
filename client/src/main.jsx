import React from 'react';
//import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import List from './components/List';
//import CounterActions from './actions/CounterActions';
//import CounterStore from './stores/CounterStore';
import '../css/style.css';

window.onload = () => {
//    const items = [
//        {id: 1, name: "User 1", number: 0},
//        {id: 2, name: "User 2", number: 0},
//        {id: 3, name: "User 3", number: 0},
//        {id: 4, name: "User 4", number: 0},
//    ];
//    const infoUrl = 'http://localhost:3001/info';

//    // Unusually, create the CounterStore Singleton
//    Reflux.initStore(CounterStore);
//    CounterActions.init(items);

//    console.log("STORE: %o",CounterStore);

    ReactDOM.render(
        <List />,
        document.getElementById('list')
    );
};
