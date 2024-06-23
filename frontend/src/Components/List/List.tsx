import React, { useState, useRef } from 'react';
import { ListProps, Item } from '../../types/types';
import axios from 'axios';

import './List.css';

function List({ list }: ListProps) {
    const [items, setItems] = useState<Item[]>(list.items);
    const [isAddVisible, setAddVisible] = useState(false);
    const [itemName, setItemName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemName.trim() === '') {
            return; // Return early if the input is empty or contains only whitespace
        }
        axios.post('/api/lists/addItem', { itemName: itemName, listId: list.id })
            .then((response) => {
                if (response.status === 200) {
                    const newItem = response.data;
                    setItems([...items, newItem]);
                    setItemName(''); // Clear the input after adding
                    inputRef.current?.focus(); // Set focus back to the input
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }

    const removeItem = (itemToRemove: Item) => {
        axios.post('/api/lists/removeItem', { item: itemToRemove, listId: list.id})
            .then((response) => {
                if (response.status === 200) {
                    setItems(items.filter((item) => itemToRemove.id !== item.id));
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    const toggleCompleted = (item: Item) => {        
        axios.post('/api/lists/toggleCompleted', { item: item, listId: list.id })
            .then((response) => {
                if (response.status === 200) {
                    const updatedItem = response.data;
                    setItems(items.map((item) => {
                        if (item.id === updatedItem.id) {
                            return updatedItem;
                        } else {
                            return item;
                        }
                    }));
                }
            }).catch((error) => {
                console.log(error);
            });
    }


    return (
        <div>
            {isAddVisible && (
                <form className='addForm' onSubmit={addItem}>
                    <button className='closeButton noButtonFormatting' onClick={() => { setAddVisible(!isAddVisible) }}>
                        <img src="/images/icons/back.svg" alt="Close icon" />
                    </button>

                    <input 
                        type='text' 
                        placeholder='Add item...' 
                        value={itemName}
                        onChange={handleInputChange}
                        ref={inputRef} // Assign the ref to the input element
                    />
                    <button className="addItemButton" type="submit">Add</button>
                </form>
            )}

            <ul className="list">
                {items.map((item, index) => (
                    <li key={index}>
                        <button className='completeItemButton noButtonFormatting' onClick={() => {toggleCompleted(item)}}>
                            <img src={item.completed ? "/images/icons/checked.svg" : "/images/icons/unchecked.svg"} alt="Complete List" />
                        </button>

                        <p className='listItemName'>{item.name}</p>
                        <button className='removeItemButton noButtonFormatting' onClick={() => removeItem(item)}>
                            <img src="/images/icons/remove.svg" alt="Remove icon" />
                        </button>
                    </li>
                ))}
            </ul>
            
            {!isAddVisible && (
                <button className="noButtonFormatting openAddItemButton" onClick={() => { setAddVisible(!isAddVisible) }}>+ Add</button>
            )}
        </div>
    );
}

export default List;
