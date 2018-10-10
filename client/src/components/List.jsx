import React from 'react';
import Item from './Item';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {items: [
            {name: "User 1", number: 0},
            {name: "User 2", number: 0},
            {name: "User 3", number: 0},
            {name: "User 4", number: 0},
        ]};
        this.updateCounter = this.updateCounter.bind(this);
    }
    updateCounter(index) {
        console.log("got here %o",index);
        const newItems = this.state.items.slice();
        newItems[index].number = newItems[index].number + 1;
        this.setState({items: newItems});

    }
    render() {
        return (
            <div className="list">
                {
                    this.state.items.map((item, index) => {
                        // shallow copy
                        const props = Object.assign({
                            key: index,
                            id: index,
                            updateCounter: this.updateCounter,
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
