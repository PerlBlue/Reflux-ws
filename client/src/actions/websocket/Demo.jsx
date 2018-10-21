'use strict';

var Reflux = require('reflux');

var DemoWebsocketActions = Reflux.createActions([
	'successDemoWebsocketStatus',
	'failureDemoWebsocketStatus'
]);

module.exports = DemoWebsocketActions;
