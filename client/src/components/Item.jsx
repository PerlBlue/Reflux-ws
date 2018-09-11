import React from 'react';
import Counter from './Counter';

const Item = (props) => {

    console.log("Item: props=%o",props);
    return (
        <div className="list__item">
            <div className="list__name">{props.name}</div>
            <Counter {...props} />
        </div>
    );
};

export default Item;
