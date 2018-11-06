import React from 'react';
import Item from './Item';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {items: [
            {id: 0, name: "User 1", number: 0},
            {id: 1, name: "User 2", number: 0},
            {id: 2, name: "User 3", number: 0},
            {id: 3, name: "User 4", number: 0},
        ]};
        this.updateCounter = this.updateCounter.bind(this);
    }
    updateCounter(index) {
        console.log("Update Counter %o",index);
        const newItems = this.state.items.slice();
        newItems[index].number = newItems[index].number + 1;
        this.setState({items: newItems});
    }
    render() {
        return (
            <div className="list">
                {
                    this.state.items.map((item, index) => {
                        return <Item key={index} updateCounter={this.updateCounter} {...item} />
                    })
                }
            </div>
           );
    }

};

export default List;
