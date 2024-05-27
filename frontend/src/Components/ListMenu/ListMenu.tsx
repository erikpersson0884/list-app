import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ListMenu.css';


interface ListMenuProps {
    name: string;
    id: string;
    items: any[];
}

const ListMenu: React.FC<ListMenuProps> = (): React.ReactNode => {
    const [lists, setLists] = useState<ListMenuProps[]>([]);

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


    
    return (
        <ul className='listMenu'>
            {lists.map((list: any) => (
                <li key={list.id}>
                    <Link to={`/lists/${list.name}`}>
                        <p>{list.name} </p>
                        <p>{list.items.length} items</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ListMenu;
