import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import WebsocketActions from '../actions/WebsocketActions';
import DemoWebsocketActions from '../actions/websocket/DemoWebsocketActions';

import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor() {
        super();
        this.url = 'ws://localhost:8090';

        this.state = {
            items : [],
        };

        this.listenables = [CounterActions, WebsocketActions, DemoWebsocketActions];
    }

    onWebsocketOpened() {
        console.log("CounterStore: web socket opened");

        WebsocketActions.websocketSend({
            route : 'demo/register',
            content : {}
        });
    }


    onCounterDestroy() {
        this.state = {};
    }

    onCounterEnable(id) {
        console.log("COUNTER ENABLE %o",id);
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


    onSuccessDemoWebsocketStatus(msg) {
        console.log("DEMO WEBSOCKET STATUS %o",msg);

        this.setState({ items: msg });
        console.log("STATE %o", this.state);
    }
}

export default CounterStore;
