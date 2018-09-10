import React from 'react';
import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import CounterStore from '../stores/CounterStore';

class Counter extends Reflux.Component {

    constructor(props) {
        // So we can access 'this.props' in the constructor
        super(props);

        console.log("Counter props = %o", this.props);
        // Local state
        this.state = {
            status: 'enabled',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) { //change status on click
        console.log("handleClick");
        if (this.state.status === 'enabled') {
            this.setState({ status: 'disabled' });
            CounterActions.disable(this.props.id);
        }
        if (this.state.status === 'disabled') {
            this.setState({ status: 'enabled' });
            CounterActions.enable(this.props.id);
        }
    }

    render() {
        const counterClass = 'list__counter' + ' '
                + 'list__counter--' + this.state.status;
        return (
            <div onClick={this.handleClick} className={counterClass}>
                {this.props.id.number}
            </div>
        );
    }
};

export default Counter;
