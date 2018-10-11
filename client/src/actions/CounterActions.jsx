import Reflux from 'reflux';

const CounterActions = Reflux.createActions(['counterInit', 'counterDestroy', 'counterEnable', 'counterDisable', 'counterIncrement', 'counterToggle']);

export default CounterActions;
