import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';
import Info from './Info';

class List extends Reflux.Component {

    constructor(props) {
        super(props);

        this.store = CounterStore;
    }

    componentDidMount() {
        console.log("Component Did Mount %o", this.state.items);
    }

    render() {
        return (
            <div className="list">
                {
                    this.state.items.map((item, index) => {
                        // Each item in an array must have a unique 'key'
                        item.key = index;
                        item.id = index;

                        // Use the 'rest operator' (three dots)
                        return <Item {...item} />
                    })
                }
            </div>
           );
    }

};

export default List;
