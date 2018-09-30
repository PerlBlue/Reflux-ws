import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import io from 'socket.io-client';

class CounterStore extends Reflux.Store {

    constructor() {
        super();
        this.url = 'ws://localhost:8090';

        console.log("CONSTRUCTOR");
    	this.state = {items: [
	        {name: "User 1", number: 0},
	        {name: "User 2", number: 0},
	        {name: "User 3", number: 0},
	        {name: "User 4", number: 0},
	    ]};

        this.connected = false;
        this.handleOpen = this.handleOpen.bind(this);

//        this.handleConnect = this.handleConnect.bind(this);
//        this.handleUpdate = this.handleUpdate.bind(this);
//        this.handleDisconnect = this.handleDisconnect.bind(this);

        this.socket = new WebSocket(this.url);
        this.handleConnect();

        this.listenables = CounterActions;
    }

    handleOpen() {
        this.connected = true;
        let ids = [0,1,2,3];
        var msg = JSON.stringify(ids);
        console.log("ON-OPEN ["+msg+"]");

        this.socket.send(msg);
    }

    handleConnect() {
        if (!this.socket) {
            return false;
        }
        this.socket.onopen = function(event) {
            this.handleOpen();
        }.bind(this);

        this.socket.onmessage = function(event) {
            console.log("ON-MESSAGE"+event.data);
        };

//        this.socket.on('connect', () => {
//            if (!this.socket) {
//                return false;
//            }
//            this.connected = true;
//            let ids = [0,1,2,3];
//
//            this.socket.emit('subscribe', {ids}, () => {
//                this.handleUpdate();
//            });
//            this.handleDisconnect();
//        });
    }

//    handleUpdate() {
//        if (!this.socket) {
//            return false;
//        }
//        this.socket.on('update', (data) => {
//
//            let items = this.state.items;
//            items[data.id].number = data.number;
//
//            this.setState(items);
//
//
//        });
//        this.socket.on('status', (data) => {
//            this.setState({[data]: data});
//        });
//        this.socket.on('error', (data) => {
//            alert(data.message);
//            this.onDestroy();
//        });
//    }
//
//    handleDisconnect() {
//        this.socket.on('disconnect', () => {
//            this.connected = false;
//            this.setState({});
//            return;
//        });
//    }

    onDestroy() {
        this.state = {};
        this.socket.disconnect();
    }

    onEnable(id) {
        this.socket.emit('enable', {id});
    }

    onDisable(id) {
        this.socket.emit('disable', {id});
    }

//    onInit(ids) {
//
////        this.ids = ids;
//        if (!this.socket) {
//            this.socket = io.connect(this.url);
//        }
//        this.handleConnect();
//    }

}

export default CounterStore;
