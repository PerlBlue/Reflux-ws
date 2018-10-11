import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import WebsocketActions from '../actions/WebsocketActions';

import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor() {
        super();

    	this.state = {items: [
	        {name: "User 1", number: 0, state: 'enabled'},
	        {name: "User 2", number: 0, state: 'enabled'},
	        {name: "User 3", number: 0, state: 'enabled'},
	        {name: "User 4", number: 0, state: 'enabled'},
	    ]};

        this.listenables = [CounterActions];
    }

    onCounterDestroy() {
        this.state = {};
    }

    onCounterEnable(id) {
        console.log("Enable counter "+id);
    }

    onCounterDisable(id) {
        console.log("Disable counter "+id);
    }

}

export default CounterStore;
