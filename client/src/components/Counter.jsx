import React from 'react';
import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';

class Counter extends Reflux.Component {

    constructor(props) {
        // So we can access 'this.props' in the constructor
        super(props);

        // Local state
        this.state = {
            status: 'enabled',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // update the counter in the parent
        //this.props.updateCounter(this.props.id);

        // Change the local state to reflect the enabled status
        if (this.state.status === 'enabled') {
            this.setState({ status: 'disabled' });
            CounterActions.counterDisable(this.props.id);
        }
        if (this.state.status === 'disabled') {
            this.setState({ status: 'enabled' });
            CounterActions.counterEnable(this.props.id);
        }
    }

    render() {
        const counterClass = 'list__counter' + ' '
                + 'list__counter--' + this.state.status;
        return (
            <div onClick={this.handleClick} className={counterClass}>
                {this.props.number}
            </div>
        );
    }
};

export default Counter;
