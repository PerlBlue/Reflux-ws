import React from 'react';
import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';

class Counter extends Reflux.Component {

    constructor(props) {
        // So we can access 'this.props' in the constructor
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) { //change status on click
        if (this.props.status === 'enabled') {
            this.setState({ status: 'disabled' });
            CounterActions.counterDisable(this.props.id);
        }
        if (this.props.status === 'disabled') {
            this.setState({ status: 'enabled' });
            CounterActions.counterEnable(this.props.id);
        }
    }

    render() {
        const counterClass = 'list__counter' + ' '
                + 'list__counter--' + this.props.status;
        return (
            <div onClick={this.handleClick} className={counterClass}>
                {this.props.number}
            </div>
        );
    }
};

export default Counter;
