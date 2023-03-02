import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, DashboardOutlined, FormOutlined, OrderedListOutlined } from '@ant-design/icons';
import logo from '../images/logo.png';
import { getProfile } from '../utils/index';
import './Navbar.css'

function Navbar() {
    const profileData = getProfile();
    const iconStyle = { fontSize: '20px', transition: '0.3s' };
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
            itemName: profileData.name + " " + profileData.surname,
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
        <>
            <nav className='navbar_container'>
                <div className='logo_container'>
                    <img src={logo} alt='logo' />
                </div>
                <div className="navbar_items_container">
                    {navbarItemWithIcon.map(item =>
                        <Link className={`navbar_item ${item.className}`} to={item.href} key={item.itemName}>
                            {item.icon}
                            <p>{item.itemName}</p>
                        </Link>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;