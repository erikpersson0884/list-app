import React, { useState } from 'react';
import { ListProps } from '../../types/types';
import axios from 'axios';


const RenameList = ({list}: ListProps) => {

    const handleCancel = () => {
        console.log('Cancel');
        
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New name:', newName);

        axios.post('/lists/renameList', { listId: list.id, listName: 'New List Name' })
    };

    return (
        <div>
            <button className='closebutton' onClick={handleCancel}>X</button>
            <h2>Rename List</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={newName} onChange={handleInputChange} />
                <button type="submit">Rename</button>
            </form>
        </div>
    );
};

export default RenameList;