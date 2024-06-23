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

    const numberOfCompletedItems = list.items.filter(item => item.completed).length;
    const completedPercentage = (numberOfCompletedItems / list.items.length) * 100;

    return (
        <>
            <Link className="listMenuItem" to={`/lists/${list.name}`}>
                <div className='listInfo'>
                    <p className='listName'>{list.name} </p>
                    <p>{numberOfCompletedItems} / {list.items.length}</p>

                    <button onClick={handleManageList}>
                        <img src="/images/icons/edit.svg" alt="Manage List" />
                    </button>
                </div>

                <div className='percentageDiv'>
                    <div className='completedPercentageDiv' style={{ width: completedPercentage + "%" }}></div>
                </div>

            </Link>

            {isManageListVisible && (
                <ManageList list={list} onClose={handleCloseManageList} activeList={activeList} removeList={removeList} />
            )}
        </>
    );
}

export default ListMenuItem;
