import Reflux from 'reflux';

const CounterActions = Reflux.createActions(['counterDestroy', 'counterEnable', 'counterDisable', 'counterIncrement', 'counterToggle']);

export default CounterActions;
