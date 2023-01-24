import React from 'react';
import { UserOutlined, LogoutOutlined, DashboardOutlined, FormOutlined, OrderedListOutlined } from '@ant-design/icons';
import logo from '../images/logo.png';
import './Navbar.css'

function Navbar() {
    const iconStyle = { fontSize: '19px', transition: '0.3s' }
    const navbarItemWithIcon = [
        {
            itemName: 'Gatnaşyk almak',
            className: '',
            href: '/gatnasyk',
            icon: <FormOutlined style={iconStyle} />
        },
        {
            itemName: 'Hasabat',
            className: '',
            href: '/hasabat',
            icon: <OrderedListOutlined style={iconStyle} />
        },
        {
            itemName: 'Admin',
            className: '',
            href: '/admin',
            icon: <DashboardOutlined style={iconStyle} />
        },
        {
            itemName: 'Maksat Akmyradow',
            className: '',
            icon: <UserOutlined style={iconStyle} />
        },
        {
            itemName: 'Çykmak',
            className: 'logout',
            icon: <LogoutOutlined style={iconStyle} />
        }
    ]

    return (
        <nav className='navbar_container'>
            <div className='logo_container'>
                <img src={logo} alt='logo' />
            </div>
            <div class="navbar_items_container">
                {navbarItemWithIcon.map(item =>
                    <div className={`navbar_item ${item.className}`}>
                        {item.icon}
                        <p>{item.itemName}</p>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;