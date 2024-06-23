import React from 'react';
import { useState, useEffect } from 'react';
import ListMenuItem from './ListMenuItem';
import { ListsProps, List } from '../../types/types';


import './ListMenu.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddList from './AddList';



const ListMenu = () =>{
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
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
    }, []); // Add an empty dependency array to useEffect to ensure it only runs once




    const removeList = (listId: string) => {
        const newLists = lists.filter((l) => l.id !== listId);
        axios.post(`/api/lists/removeList`, { listId: listId })
            .then(() => {
                setLists(newLists);
            });
    }



    const [isAddVisible, setAddVisible] = useState(false);
    const closeAddList = () => {
        setAddVisible(false);
    }

    const openAddList = () => {
        setAddVisible(true);
    }

    const handleAddList = (listName: String) => {
        axios.post(`/api/lists/addList`, { listName: listName })
            .then((response) => {
                setLists(response.data);
            });
    }

    return (
        <ul className='listMenu'>
            {lists.map((list: any) => (
                <ListMenuItem list={list} key={list.id} removeList={removeList} />
            ))}

            <li className='addList' onClick={openAddList} key={"addList"}>
                Add  List +
            </li>

            {isAddVisible && (
                <AddList onClose={closeAddList} onSave={handleAddList} key={"AddListDiv"}/>
            )}
        </ul>
    );
};

export default ListMenu;
