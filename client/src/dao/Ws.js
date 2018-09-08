import io from 'socket.io-client';

import WsActions from '../actions/WsActions.jsx';

class Ws {

    constructor() {
        this.url = 'ws://localhost:3001';
        this.connected = false;
        this.handleConnect = this.handleConnect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.socket = io.connect(this.url);
        this.handleConnect();

        WsActions.wsInit.listen(function(result) {
            console.log("WS Init Triggered");
        });
		console.log("WS Constructor");
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
            this.handleDisconnect();
        });
    }

    handleUpdate() {

    }

    handleDisconnect() {
        console.log("handle disconnect");
        this.socket.on('disconnect', () => {
            this.connected = false;
            return;
        });
    }
}

export default Ws;

