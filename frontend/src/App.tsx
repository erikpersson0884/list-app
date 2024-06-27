import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './App.css'

import ListMenu from './Components/ListMenu/ListMenu'
import RenameList from './Components/ListMenu/ListInput/RenameList';

import ManageList from './Components/ManageList/ManageList';
import AddList from './Components/ListMenu/ListInput/AddList';
import List from './Components/List/List';

import { List as ListInterface} from './types/types';
import React from 'react';


const  App = () => {
    const [lists, setLists] = useState([]);

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


    const [activeList, setActiveList] = useState<ListInterface | null>(null);
    const [isManageListVisible, setManageListVisible] = useState<boolean>(false);
    const [isRenameListVisible, setRenameListVisible] = useState<boolean>(false);
    const [isAddListVisible, setAddListVisible] = useState<boolean>(false);


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ListMenu 
                            lists={lists} 
                            setActiveList={setActiveList} 
                            setManageListVisible={setManageListVisible} 
                            setAddListVisible={setAddListVisible} 
                        />
                    } />

                    {lists.map((list: ListInterface) => (
                        <Route
                            path={`/lists/${list.name}`}
                            element={
                                <List 
                                    list={list} 
                                    setManageListVisible={setManageListVisible} 
                                    setActiveList={setActiveList}
                                />
                            }
                            key={list.name}
                        />
                    ))}
                </Routes>

            </BrowserRouter>

            {isManageListVisible && (
                    <ManageList 
                        activeList={activeList} 
                        onClose={() => {
                            setManageListVisible(false);
                            setActiveList(null);
                            updateLists();
                        }} 
                        openRenameList={() => {
                            setManageListVisible(false);
                            setRenameListVisible(true);
                        }}  
                    />
            )}

            {isRenameListVisible && (
                <RenameList onClose={() => {setRenameListVisible(false); updateLists();} } activeList={activeList} key={"RenameListDiv"}/>
            )}

            {isAddListVisible && (
                <AddList onClose={() => {setAddListVisible(false); updateLists();} } key={"AddListDiv"}/>
            )}

            
        </>
      );
  }


export default App
