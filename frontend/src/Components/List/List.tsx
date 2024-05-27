import React from 'react';


import './List.css';



interface ListProps {
    list: {
        name: string;
        id: string;
        items: any[];
    };
}

function List({ list }: ListProps) {

    if (!list) {
        return <h2>Loading...</h2>;
    }

    if (list.items.length === 0) {
        return <h2>List not found</h2>;
    }

    return (
        <div>
            {/* <h2>{`Displaying ${list.name}`}</h2> */}
            <ul className="list">
                {list.items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default List;
