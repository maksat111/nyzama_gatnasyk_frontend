import React from 'react';
import logo from '../images/logo.png';
import './Navbar.css'

function Navbar() {
    const navbarItems = [
        {
            itemName: 'Gatnaşyk almak',
            href: '/gatnasyk'
        },
        {
            itemName: 'Hasabat',
            href: '/hasabat'
        },
        {
            itemName: 'Admin',
            href: '/admin'
        }
    ];

    const navbarItemWithIcon = [
        {
            itemName: 'Maksat Akmyradow',
            className: ''
        },
        {
            itemName: 'Çykmak',
            className: 'logout'
        }
    ]

    return (
        <nav className='navbar_container'>
            <div className='logo_container'>
                <img src={logo} alt='logo' />
            </div>
            <div class="navbar_items">
                {navbarItems.map(item => <a href={item.href}>{item.itemName}</a>)}
                <div className='navbar_item_with_user'>
                    {navbarItemWithIcon.map(item => <p className={item.className}>{item.itemName}</p>)}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;