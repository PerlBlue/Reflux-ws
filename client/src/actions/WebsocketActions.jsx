import Reflux from 'reflux';

const WebsocketActions = Reflux.createActions(['websocketOpened', 'websocketInit', 'websocketSend']);
//const WebsocketActions = Reflux.createActions(['counterInit', 'counterDestroy', 'counterEnable', 'counterDisable']);

export default WebsocketActions;
