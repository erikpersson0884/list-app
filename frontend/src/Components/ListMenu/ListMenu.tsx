import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { List } from '../../types/types';
import ListMenuItem from './ListMenuItem/ListMenuItem';
import AddList from './ListInput/AddList';
import RenameList from './ListInput/RenameList';
import './ListMenu.css';
import ManageList from '../ManageList/ManageList';
import Header from '../Header/Header';




const ListMenu = () =>{
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        updateLists();
    }, []); // Add an empty dependency array to useEffect to ensure it only runs once


    const updateLists = () => {
        fetch(`/api/lists/getAllLists`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setLists(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const [isAddVisible, setAddVisible] = useState(false);
    const saveAdd = () => {
        updateLists();
        setAddVisible(false);
    }

    const [isRenameVisible, setRenameVisible] = useState(false);


    const [isManageListVisible, setManageListVisible] = useState(false);
    const [activeList, setActiveList] = useState<List | null>(null);


    return (
        <>
            <Header title='Lists' subHeader={null} />
            <ul className='listMenu'>
                {lists.map((list: any) => (
                    <ListMenuItem list={list} openManageList={() => {
                        setManageListVisible(true);
                        setActiveList(list);
                    }} key={list.id} />
                ))}

                <li className='addList' onClick={() => {setAddVisible(true)}} key={"addList"}>
                    Add  List +
                </li>

                {isManageListVisible && (
                    <ManageList activeList={activeList} onClose={() => {
                        setManageListVisible(false);
                        setActiveList(null);
                        updateLists();
                    }} openRenameList={() => {
                        setRenameVisible(true);
                        setManageListVisible(false);
                    }}  />
                )}

                {isAddVisible && (
                    <AddList onClose={saveAdd} key={"AddListDiv"}/>
                )}

                {isRenameVisible && (
                    <RenameList onClose={() => {setRenameVisible(false); updateLists();} } activeList={activeList} key={"RenameListDiv"}/>
                )}

            </ul>
        </>
        
    );
};

export default ListMenu;
