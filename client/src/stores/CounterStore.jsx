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
        this.onCounterEnable = this.onCounterEnable.bind(this);
        this.onCounterDisable = this.onCounterDisable.bind(this);
        this.onCounterDestroy = this.onCounterDestroy.bind(this);

        this.socket = new WebSocket(this.url);
        this.handleConnect();

        this.listenables = CounterActions;
    }

    handleOpen() {
        this.connected = true;
        var content = {
            route : 'demo/register',
            content : {
                ids : 4
            }
        };
        var msg = JSON.stringify(content);
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
    }

    onCounterDestroy() {
        this.state = {};
        this.socket.disconnect();
    }

    onCounterEnable(id) {
        var content = {
            route : 'demo/enable',
            content : {
                id : id
            }
        };
        var msg = JSON.stringify(content);
        console.log("ON-ENABLE ["+msg+"]");
        this.socket.send(msg);
    }

    onCounterDisable(id) {
        var content = {
            route : 'demo/disable',
            content : {
                id : id
            }
        };
        var msg = JSON.stringify(content);
        console.log("ON-DISABLE ["+msg+"]");
        this.socket.send(msg);
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
