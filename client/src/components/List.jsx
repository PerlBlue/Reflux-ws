import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';

class List extends Reflux.Component {

    constructor(props) {
        super(props);

        this.store = CounterStore;
    }

    render() {
        return (
            <div className="list">
                {
                    this.state.items.map((item, index) => {
                        // shallow copy, 'key' is required by react
                        // to identify the item in the DOM
                        const props = Object.assign({
                            key: index,
                        }, item);

                        // Use the 'rest operator' (three dots)
                        return <Item {...props} />
                    })
                }
            </div>
           );
    }

};

export default List;
