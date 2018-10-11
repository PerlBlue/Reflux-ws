import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';

import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor() {
        super();

    	this.state = {items: [
	        {id: 0, name: "User 1", number: 0, status: 'enabled'},
	        {id: 1, name: "User 2", number: 0, status: 'enabled'},
	        {id: 2, name: "User 3", number: 0, status: 'enabled'},
	        {id: 3, name: "User 4", number: 0, status: 'enabled'},
	    ]};

        this.listenables = [CounterActions];

    }

    onCounterDestroy() {
        this.state = {};
    }

    onCounterIncrement(id) {
        this.setState(function(state) {
            state.items[id].number = state.items[id].number + 1;
        });
    }

    onCounterToggle(id) {
        if (this.state.items[id].status === 'enabled') {
            this.onCounterDisable(id);
        }
        else {
            this.onCounterEnable(id);
        }
    }
    onCounterEnable(id) {
        console.log("Enable counter "+id);
        this.setState(function(state) {
            state.items[id].status = 'enabled';
            return {
                items: state.items
            }
        });
        this.onCounterIncrement(id);
    }

    onCounterDisable(id) {
        console.log("Disable counter "+id);
        this.setState(function(state) {
            state.items[id].status = 'disabled';
            return {
                items: state.items
            }
        });
        this.onCounterIncrement(id);
    }

}

export default CounterStore;
