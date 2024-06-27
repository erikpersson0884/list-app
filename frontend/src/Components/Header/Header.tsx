import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';


interface HeaderProps {
    title: any;
    openSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({title, openSettings}) => {
    const location = useLocation();
    const showBackButton = location.pathname.startsWith('/lists/');
    const showSettingsButton = openSettings !== undefined;

    return (
        <header >
            {showBackButton && (
                <button className=' noButtonFormatting'>
                    <Link to="/">
                        <img src="/images/icons/back.svg" alt="Back icon" />
                    </Link>
                </button>
            )}
            
            <h1>{title}</h1>

            {showSettingsButton && (
                <button className=' noButtonFormatting' onClick={openSettings}>
                    <img className="openSettingsButton" src="/images/icons/settings.svg" alt="Settings icon" />
                </button>
            )}
        </header>
    );
};

export default Header;
