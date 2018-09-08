import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import WsActions from '../actions/WsActions';

import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor(props) {
        super(props);
        this.ids = [];
        this.state = {};
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onWsConnected = this.onWsConnected.bind(this);
        // actions to listen to
        this.listenables = [CounterActions, WsActions];
        console.log("CounterStore: constructor");
    }

    handleUpdate() {
        this.socket.on('update', (data) => {
            this.setState({[data.id]: data});
        });
        this.socket.on('status', (data) => {
            this.setState({[data.id]: data});
        });
        this.socket.on('error', (data) => {
            alert(data.message);
            this.onDestroy();
        });
    }

    onCounterEnable(id) {
        this.socket.emit('enable', {id});
    }

    onCounterDisable(id) {
        this.socket.emit('disable', {id});
    }

    onCounterInit(ids) {
        this.ids = ids;
    }

    onWsConnected() {
        console.log("Counter WS Connect");
        let ids = this.ids;
        // Now send a subscribe message
        console.log("Counter: subscribe to WS");
        WsActions.wsCall('subscribe', {ids} );
    }
}

export default CounterStore;
