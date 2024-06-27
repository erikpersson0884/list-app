import React, { useEffect, useState } from 'react';
import { List } from '../../types/types';
import './ManageList.css';
import axios from 'axios';

interface ManageListProps {
    activeList: List | null;
    onClose: () => void;
    openRenameList: () => void;
}

const ManageList = ({ activeList, onClose, openRenameList }: ManageListProps) => {
    const removeList = () => { // is called when a user clicks on the Delete option button
        if (!activeList) return;

        axios.post(`/api/lists/removeList`, { listId: activeList.id })
            .then(() => {
                onClose();
            });
    }


    const options = [
        { name: 'Rename', icon: '/images/icons/edit.svg', action: openRenameList },
        { name: 'Delete', icon: '/images/icons/remove.svg', action: removeList }
    ];
    
    return (
        <div className='manageList'>
            <button className='closeButton' onClick={onClose}>
                <img src='/images/icons/close.svg' alt='Close' />
            </button>

            <h2 className='manageListTitle'>Manage List</h2>

            <ul className='no-ul-formatting'>
                {options.map((option) => (
                    <li key={option.name} onClick={option.action}>
                        <img src={option.icon} alt={option.name} />
                        <p>{option.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageList;
