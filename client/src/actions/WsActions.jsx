import Reflux from 'reflux';

const WsActions = Reflux.createActions(['wsInit', 'wsDestroy', 'wsConnected', 'wsCall']);

export default WsActions;
