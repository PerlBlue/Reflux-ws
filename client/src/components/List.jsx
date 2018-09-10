import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';
import Info from './Info';

class List extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: Separation of concerns. Create store in main.jsx
        let ids = [];
        this.props.items.forEach((item) => {
           ids.push(item.id);
        });

        // Unusually, create the CounterStore Singleton
        Reflux.initStore(CounterStore);
        CounterActions.init(ids);
    }

    render() {
        return (
            <div className="list">
                {
                    this.props.items.map((item, index) => {
                        // Each item in an array must have a unique 'key'
                        console.log("List ITEM %o",item);
                        console.log("List INDEX %o", index);
                        item.key = index;

                        // Use the 'rest operator' (three dots)
                        return <Item {...item} />
                    })
                }
// Lose this?            <Info infoUrl={this.props.infoUrl} />
            </div>
           );
    }

};

export default List;
