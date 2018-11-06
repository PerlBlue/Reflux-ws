import React from 'react';
import Counter from './Counter';

const Item = ({updateCounter, item}) =>
    <div className="list__item">
        <div className="list__name">{item.name}</div>
        <Counter updateCounter={updateCounter} {...item} />
    </div>

export default Item;
