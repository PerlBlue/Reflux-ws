import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor(props) {
        super(props);
        this.url = 'ws://localhost:3001';
        this.ids = [];
        this.connected = false;
        this.socket = null;
        this.state = {};
        this.handleConnect = this.handleConnect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        // actions to listen to
        this.listenables = [WsActions, CounterActions];
        console.log("CounterStore: constructor");
    }

    handleConnect() {
        if (!this.socket) {
            return false;
        }
        this.socket.on('connect', () => {
            if (!this.socket) {
                return false;
            }
            this.connected = true;
            let ids = this.ids;
            this.socket.emit('subscribe', {ids}, () => {
                this.handleUpdate();
            });
            this.handleDisconnect();
        });
    }

    handleUpdate() {
        if (!this.socket) {
            return false;
        }
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

    handleDisconnect() {
        this.socket.on('disconnect', () => {
            this.connected = false;
            this.setState({});
            return;
        });
    }

    onWsDestroy() {
        this.ids = [];
        this.socket.disconnect();
    }

    onCounterEnable(id) {
        this.socket.emit('enable', {id});
    }

    onCounterDisable(id) {
        this.socket.emit('disable', {id});
    }

    onCounterInit(ids) {
        this.ids = ids;
//        if (!this.socket) {
//            this.socket = io.connect(this.url);
//        }
//        this.handleConnect();
    }
}

export default CounterStore;
