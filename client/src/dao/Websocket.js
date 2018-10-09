import io from 'socket.io-client';

import WebsocketActions from '../actions/WebsocketActions.jsx';

class Ws {

    constructor() {
        this.url = 'ws://localhost:8090';
        this.connected = false;

        this.handleConnect = this.handleConnect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.socket = new WebSocket(this.url);
        this.socket.onopen = function(event) {
            this.handleOpen(event);
        }.bind(this);

        WebsocketActions.websocketOpened.listen( (result) => {
            console.log("Websocket Opened Triggered");
        });
        WebsocketActions.websocketSend.listen( (content) => {
            var msg = JSON.stringify(content);
            console.log("Websocket SEND "+msg);
            this.socket.send(msg);
        });

//        WsActions.wsOpened.listen( (result) => {
//            console.log("WS Opened 1");
//        })

//        WsActions.wsSend.listen( (msg) => {
//            console.log("WS SEND");
//        })

///        WsActions.wsInit.listen( (result) => {
///            console.log("WS Init Triggered %o", this);
///            if (!this.socket) {
///                this.socket = io.connect(this.url);
///            }
///            this.handleConnect();
///            console.log("WS socket=%o",this.socket);
///        } );

///        WsActions.wsCall.listen( (method, args, fn) => {
///            console.log("WsActions:wsCall method="+method+" args=%o",args);
///            console.log("WsActions:wsCall args %o", args);
///            console.log("WsActions:wsCall socket=%o", this.socket);
///            console.log("WsActions:wsCall fn=%o", fn);
///
///            this.socket.emit(method, args, fn);
///        });

		console.log("WS Constructor");
    }

    // On receiving a wsSend action, send it to the server
    onWebsocketSend(content) {
        var msg = JSON.stringify(content);
        console.log("Send message to server "+msg);
        this.socket.send(msg);
    }

    // Handle the opening of the web-socket
    handleOpen() {
        this.connected = true;

        // Inform anyone that the connection is opened
        WebsocketActions.websocketOpened('hello');
        console.log("WS: handleOpen");


//        var content = {
//            route : 'demo/register',
//            content : {
//                ids : 4
//            }
//        };
//        var msg = JSON.stringify(content);
//        console.log("ON-OPEN ["+msg+"]");
//
//        this.socket.send(msg);
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


//    handleConnect() {
//        if (!this.socket) {
//            return false;
//        }
//        console.log("Ws:handleConnect 0");
//
//        this.socket.on('connect', () => {
//            console.log("WsActions:handleConnect 1");
//            if (!this.socket) {
//                console.log("no socket!");
//                return false;
//            }
//            console.log("Ws:handleConnect 2");
//            this.connected = true;
//            this.handleDisconnect();
//
//            // Let everyone know we have connected.
////            WsActions.wsConnected();
//        });
//
//        this.socket.on('update', (payload) => {
//            console.log("WsActions:handle update %o",payload);
////            WsActions.wsReceivedUpdate(payload);
//        });
//
//
//    }

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

