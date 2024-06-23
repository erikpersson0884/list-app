import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { List } from '../../types/types';
import ListMenuItem from './ListMenuItem/ListMenuItem';
import AddList from './ListInput/AddList';
import RenameList from './ListInput/RenameList';
import './ListMenu.css';




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


    const removeList = (listId: string) => {
        const newLists = lists.filter((l) => l.id !== listId);
        axios.post(`/api/lists/removeList`, { listId: listId })
            .then(() => {
                updateLists();
            });
    }

    const [isAddVisible, setAddVisible] = useState(false);
    const saveAdd = () => {
        updateLists();
        setAddVisible(false);
    }

    const [isRenameVisible, setRenameVisible] = useState(false);
    const saveRename = () => {
        updateLists();
        setRenameVisible(false);
    }


    return (
        <ul className='listMenu'>
            {lists.map((list: any) => (
                <ListMenuItem list={list} key={list.id} removeList={removeList} />
            ))}

            <li className='addList' onClick={() => {setAddVisible(true)}} key={"addList"}>
                Add  List +
            </li>

            {isAddVisible && (
                <AddList onClose={saveAdd} key={"AddListDiv"}/>
            )}

            {isRenameVisible && (
                <RenameList onClose={saveRename} key={"RenameListDiv"}/>
            )}
        </ul>
    );
};

export default ListMenu;
