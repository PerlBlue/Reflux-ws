import React from 'react';
import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';

class Counter extends Reflux.Component {

    constructor(props) {
        // So we can access 'this.props' in the constructor
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        CounterActions.counterToggle(this.props.id);
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
