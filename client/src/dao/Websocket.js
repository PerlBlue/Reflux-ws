import io from 'socket.io-client';

import WebsocketActions from '../actions/WebsocketActions.jsx';

class Websocket {

    constructor() {
        this.url = 'ws://localhost:8090';
        this.connected = false;

        this.handleOpen = this.handleOpen.bind(this);

        this.socket = new WebSocket(this.url);
        this.socket.onopen = function(event) {
            this.handleOpen(event);
        }.bind(this);

        WebsocketActions.websocketSend.listen( (content) => {
            var msg = JSON.stringify(content);
            console.log("Websocket SEND "+msg);
            this.socket.send(msg);
        });
    }

    // Handle the opening of the web-socket
    handleOpen() {
        this.connected = true;

        // Inform anyone that the connection is opened
        WebsocketActions.websocketOpened();
    }
}

export default Websocket;

