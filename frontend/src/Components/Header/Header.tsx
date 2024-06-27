import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';

interface HeaderProps {
    title: any;
    openSettings?: () => void; // Make openSettings prop optional
    className?: string; // Add className prop
}

const Header = ({ title, openSettings, className }: HeaderProps) => {
    const location = useLocation();
    const showBackButton = location.pathname.startsWith('/lists/');
    const showSettingsButton = openSettings !== undefined;

    return (
        <header className={className}> {/* Pass className prop to header element */}
            {showBackButton && (
                <button className='noButtonFormatting'>
                    <Link to="/">
                        <img src="/images/icons/back.svg" alt="Back icon" />
                    </Link>
                </button>
            )}

            <h1>{title}</h1>

            {showSettingsButton && (
                <button className='noButtonFormatting' onClick={openSettings}>
                    <img className="openSettingsButton" src="/images/icons/settings.svg" alt="Settings icon" />
                </button>
            )}
        </header>
    );
};

export default Header;
