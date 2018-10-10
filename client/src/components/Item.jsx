import React from 'react';
import Reflux from 'reflux';

import Counter from './Counter';

class Item extends Reflux.Component {

    constructor(props) {
        super(props);

        console.log("ITEM: "+this.props.id);
    }

    render() {
        return (
            <div className="list__item">
                <div className="list__name">{this.props.name}</div>
                <Counter {...this.props} />
            </div>
        );
    }
}

export default Item;
