import Reflux from 'reflux';

const WsActions = Reflux.createActions(['wsInit', 'wsDestroy', 'wsConnected', 'wsCall', 'wsReceivedUpdate']);

export default WsActions;
