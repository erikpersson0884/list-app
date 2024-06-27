import React from 'react';
import { useState, useEffect } from 'react';

import { List as ListInterface} from '../../types/types';
import ListMenuItem from './ListMenuItem/ListMenuItem';
import './ListMenu.css';
import Header from '../Header/Header';

interface ListMenuProps {
    lists: ListInterface[];
    setActiveList: (list: ListInterface) => void;
    setManageListVisible: (visible: boolean) => void;
    setAddListVisible: (visible: boolean) => void;
}

const ListMenu = ({ lists, setActiveList, setManageListVisible, setAddListVisible }: ListMenuProps) => {


    return (
        <>
            <Header title='Lists' subHeader={null} />
            <ul className='listMenu'>
                {lists.map((list: any) => (
                    <ListMenuItem 
                        list={list} 
                        openManageList={() => {
                            setActiveList(list);
                            setManageListVisible(true);
                        }} 
                        key={list.id} />
                ))}

                <li className='addList' onClick={() => {setAddListVisible(true)}} key={"addList"}>
                    Add  List +
                </li>
            </ul>
        </>
        
    );
};

export default ListMenu;
