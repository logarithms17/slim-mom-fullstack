import React, { useState } from 'react';
import css from './Hamburger.module.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`${css.hamburger} ${isOpen ? css.active : ''}`} onClick={toggleMenu}>
                <div className={css.bar}></div>
                <div className={css.bar}></div>
                <div className={css.bar}></div>
            </div>
            <nav className={`${css.menu} ${isOpen ? css.active : ''}`}>
                <ul>
                    <li><a href="#diary">Diary</a></li>
                    <li><a href="#calculator">Calculator</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default HamburgerMenu;
