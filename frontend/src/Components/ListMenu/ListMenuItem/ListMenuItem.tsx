import React from 'react';
import { List } from '../../../types/types';
import { Link } from 'react-router-dom';
import ManageList from '../../ManageList/ManageList';

interface ListMenuItemProps {
    list: List;
    openManageList: () => void;
}

function ListMenuItem({ list, openManageList }: ListMenuItemProps) {

    const numberOfCompletedItems = list.items.filter(item => item.completed).length;
    const completedPercentage = (numberOfCompletedItems / list.items.length) * 100;

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        openManageList();
    };

    return (
        <>
            <Link className="listMenuItem" to={`/lists/${list.name}`}>
                <div className='listInfo'>
                    <p className='listName'>{list.name} </p>
                    <p>{numberOfCompletedItems} / {list.items.length}</p>

                    <button onClick={handleButtonClick}>
                        <img src="/images/icons/edit.svg" alt="Manage List" />
                    </button>
                </div>

                <div className='percentageDiv'>
                    <div className='completedPercentageDiv' style={{ width: completedPercentage + "%" }}></div>
                </div>
            </Link>
        </>
    );
}

export default ListMenuItem;
