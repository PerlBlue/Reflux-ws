import io from 'socket.io-client';

import WebsocketActions from '../actions/WebsocketActions.jsx';

var actionMap = {};
actionMap['demo']   = require('../actions/websocket/DemoWebsocketActions.jsx');

class Websocket {

    constructor() {
        this.url = 'ws://localhost:8090';
        this.connected = false;

        this.handleOpen = this.handleOpen.bind(this);

        this.socket = new WebSocket(this.url);
        this.socket.onopen = function(event) {
            this.handleOpen(event);
        }.bind(this);

        this.socket.onmessage = function(event) {
            this.handleMessage(event);
        }.bind(this);

        console.log("constructor");

        WebsocketActions.websocketSend.listen( (content) => {
            var msg = JSON.stringify(content);
            console.log("Websocket SEND "+msg);
            this.socket.send(msg);
        });
    }

    // Handle the opening of the web-socket
    handleOpen() {
        this.connected = true;
        console.log("handleOpen");

        // Inform anyone that the connection is opened
        WebsocketActions.websocketOpened();
    }

    // Handle messages from the Server
    //
    // for example: if the route comes in as '/demo/status'
    // We need to do actions from 'actions/websocket/Demo.js'
    // and call action 'successDemoWebsocketStatus' or 'failureDemoWebsocketStatus'
    //
    handleMessage(event) {

        console.log("Web Socket: message ["+event.data+"]");
        var json = JSON.parse(event.data);
        var routeMethod = json.route;

        var index   = routeMethod.lastIndexOf('/');
        var route   = routeMethod.substring(1,index);
        var method  = routeMethod.substring(index+1);
        var action  = 'success';

        var actionClass  = actionMap[route];

        // Capitalize first letter of 'method' and 'route'
        method      = method.charAt(0).toUpperCase() + method.slice(1);
        route       = route.charAt(0).toUpperCase() + route.slice(1);

        if (! actionClass) {
            console.log("ERROR: could not find route to ["+routeMethod+"]");
            return;
        }

        if (json.status > 0) {
            action = 'failure';
        }

        // Combine to create the action name
        action  = action + route + "Websocket" + method;

        // Convert the route and method into an action
        actionClass[action](json.content);
    }

}

export default Websocket;

