import React, { useEffect } from 'react';
import { ListProps, List } from '../../types/types';
import './ManageList.css';
import axios from 'axios';

interface ManageListProps {
    list: List;
    onClose: () => void;
    activeList: List | null;
    removeList: React.Dispatch<React.SetStateAction<List[]>>;
}

const ManageList = ({list, onClose, activeList, removeList}: ManageListProps) => {
    const renameList = () => {
    };

    const options = [
        { name: 'Rename', icon: '/images/icons/edit.svg', action: renameList },
        { name: 'Delete', icon: '/images/icons/remove.svg', action: () => {removeList(activeList.id);}
        },
    ];


    return (
        <div className='manageList'>
            <header>
                <h2 className='manageListTitle'>Manage List</h2>
                <button className='closeButton' onClick={onClose}>
                    <img src='/images/icons/close.svg' alt='Close' />
                </button>
            </header>
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
