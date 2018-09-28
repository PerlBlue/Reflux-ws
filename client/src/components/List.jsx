import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import WsActions from '../actions/WsActions';
import Info from './Info';

class List extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = CounterStore;
    }

    componentDidMount() {
        WsActions.wsInit();
    }

    render() {
        return (
            <div className="list">
                {
                    item.key = index;
                    return <Item { ...item } />
                }
            </div>
           );
    }

};

export default List;
