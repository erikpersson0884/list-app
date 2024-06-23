import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './App.css'

import ListMenu from './Components/ListMenu/ListMenu'
import List from './Components/List/List'
import Header from './Components/Header/Header'

function App() {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch('/api/lists/getAllLists')
            .then(response => response.json())
            .then(data => setLists(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <BrowserRouter>
            <Header></Header>

            <Routes>
                <Route path="/" element={<ListMenu />} />

                {lists.map((list) => (
                    <Route
                        path={`/lists/${list.name}`}
                        element={<List list={list} />}
                        key={list.name}
                    />
                ))}
            </Routes>

        </BrowserRouter>
      );
  }


export default App
