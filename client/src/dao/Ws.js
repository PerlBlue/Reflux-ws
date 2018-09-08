import io from 'socket.io-client';

import WsActions from '../actions/WsActions.jsx';

class Ws {

    constructor() {
        this.url = 'ws://localhost:3001';
        this.connected = false;

        this.handleConnect = this.handleConnect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        WsActions.wsInit.listen( (result) => {
            console.log("WS Init Triggered %o", this);
            if (!this.socket) {
                this.socket = io.connect(this.url);
            }
            this.handleConnect();
            console.log("WS socket=%o",this.socket);
        } );

        WsActions.wsCall.listen( (method, args) => {
            console.log("WsActions:wsCall method="+method+" args=%o",args);
            console.log("WsActions:wsCall args %o", args);
            console.log("WsActions:wsCall socket=%o", this.socket);

            this.socket.emit(method, args, () => {
                console.log("WS handle update method="+method+" args=%o",args);
                this.socket.emit( method, args );
            })
        });

		console.log("WS Constructor");
    }

    handleConnect() {
        if (!this.socket) {
            return false;
        }
        console.log("Ws:handleConnect 0");

        this.socket.on('connect', () => {
            console.log("WsActions:handleConnect 1");
            if (!this.socket) {
                console.log("no socket!");
                return false;
            }
            console.log("Ws:handleConnect 2");
            this.connected = true;
            this.handleDisconnect();

            // Let everyone know we have connected.
            WsActions.wsConnected();
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

