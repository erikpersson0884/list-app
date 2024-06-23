import React, { useState } from 'react';
import { List } from '../../../types/types';
import { Link } from 'react-router-dom';
import ManageList from '../../ManageList/ManageList';


interface ListMenuItemProps {
    list: List;
    removeList: React.Dispatch<React.SetStateAction<List[]>>;
}

function ListMenuItem({ list, removeList }: ListMenuItemProps) {
    const [isManageListVisible, setManageListVisible] = useState(false);

    const [activeList, setActiveList] = useState<List | null>(null);

    const handleManageList = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent navigation
        setActiveList(list);
        setManageListVisible(!isManageListVisible);
    };

    const handleCloseManageList = () => {
        setManageListVisible(false);
    };

    return (
        <li className='listMenuItem'>
            <Link to={`/lists/${list.name}`}>
                <p className='listName'>{list.name} </p>
                <p>{list.items.length} items</p>

                <button onClick={handleManageList}>
                    <img src="/images/icons/edit.svg" alt="Manage List" />
                </button>
            </Link>
            {isManageListVisible && (
                <ManageList list={list} onClose={handleCloseManageList} activeList={activeList} removeList={removeList} />
            )}
        </li>
    );
}

export default ListMenuItem;
