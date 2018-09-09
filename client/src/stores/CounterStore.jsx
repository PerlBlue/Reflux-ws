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
        this.onWsReceivedUpdate = this.onWsReceivedUpdate.bind(this);

        // actions to listen to
        this.listenables = [CounterActions, WsActions];
        console.log("CounterStore: constructor");
    }

    handleUpdate() {
        console.log('CounterStore:handleUpdate');
        //this.socket.on('update', (data) => {
        //    this.setState({[data.id]: data});
        //});
        //this.socket.on('status', (data) => {
        //    this.setState({[data.id]: data});
        //});
        //this.socket.on('error', (data) => {
        //    alert(data.message);
        //    this.onDestroy();
        //});
    }

    onCounterEnable(id) {
        console.log("Enable counter "+id);
        WsActions.wsCall('enable', {id});
    }

    onCounterDisable(id) {
        console.log("Disable counter "+id);
        WsActions.wsCall('disable', {id});
    }

    onCounterInit(ids) {
        this.ids = ids;
    }

    onWsConnected() {
        console.log("Counter WS Connect");
        let ids = this.ids;
        // Now send a subscribe message
        console.log("Counter: subscribe to WS");
        WsActions.wsCall('subscribe', {ids}, () => {
            this.handleUpdate();
        });
    }

    onWsReceivedUpdate(payload) {
        this.setState({[payload.id]: payload});
        console.log("Counters %o",this.state);
    }
}

export default CounterStore;
