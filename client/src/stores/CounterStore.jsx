import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import WebsocketActions from '../actions/WebsocketActions';

import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor() {
        super();
        this.url = 'ws://localhost:8090';

    	this.state = {items: [
	        {name: "User 1", number: 0},
	        {name: "User 2", number: 0},
	        {name: "User 3", number: 0},
	        {name: "User 4", number: 0},
	    ]};

        this.listenables = [WebsocketActions, CounterActions];
    }

    onCounterDestroy() {
        this.state = {};
    }

    onCounterEnable(id) {
        WebsocketActions.websocketSend({
            route : 'demo/enable',
            content : {
                id : id
            }
        });
    }

    onCounterDisable(id) {
        WebsocketActions.websocketSend({
            route : 'demo/disable',
            content : {
                id : id
            }
        });
    }

    onWebsocketOpened() {
        WebsocketActions.websocketSend({
            route : 'demo/register',
            content : {
                ids : 4
            }
        });
    }
}

export default CounterStore;
