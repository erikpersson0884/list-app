import React from 'react';

import './Header.css';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';


interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className='pageHeader'>
            <Routes>
                <Route path="/lists/*" element={
                    <button>
                        <Link to="/">
                            <img src="/images/icons/back.svg" alt="Back icon" />
                        </Link>
                    </button>
                } /> 
            </Routes>


            <h1>Lists</h1>
        </header>
    );
};

export default Header;