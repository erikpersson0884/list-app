import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';


interface HeaderProps {
    title: any;
    subHeader: ReactNode;
}

const Header: React.FC<HeaderProps> = ({title, subHeader}) => {
    const location = useLocation();
    const showBackButton = location.pathname.startsWith('/lists/');

    return (
        <header >
            <div className='pageHeader'>
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
            </div>


            {subHeader}

        </header>
    );
};

export default Header;
