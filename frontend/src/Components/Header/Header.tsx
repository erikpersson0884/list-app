import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';



const Header: React.FC = () => {

    function stripLeftOfLastSlash(input: string): string {
        const lastSlashIndex = input.lastIndexOf('/');
        if (lastSlashIndex === -1) {
            return input; // No slash found, return the original string
        }
        return input.substring(lastSlashIndex + 1);
    }

    const location = useLocation();
    const showBackButton = location.pathname.startsWith('/lists/');

    let title: string;
    if (location.pathname === '/') {
        title = 'Lists';
    } else {
        title= stripLeftOfLastSlash(location.pathname);
        title = title.replace(/%20/g, ' ');
    } 

    return (
        <header className='pageHeader'>
            {showBackButton && (
                <button>
                    <Link to="/">
                        <img src="/images/icons/back.svg" alt="Back icon" />
                    </Link>
                </button>
            )}
            
            <h1>{title}</h1>

            {showBackButton && (
                <button className='invisible'>
                    <img src="/images/icons/back.svg" alt="Back icon" />
                </button>
            )}

        </header>
    );
};

export default Header;
