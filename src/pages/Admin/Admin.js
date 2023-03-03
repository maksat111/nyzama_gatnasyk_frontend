import { React, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin.css';

function Dashboard() {
    const [bar, setBar] = useState('Talyplar');
    const sidebarItems = [
        {
            id: 1,
            content: 'Talyplar',
            href: '/admin/talyplar'
        },
        {
            id: 2,
            content: 'Ulanyjylar',
            href: '/admin/ulanyjylar'
        },
    ]
    const handleClick = (state) => {
        setBar(state)
    }
    return (
        <div className='admin_page'>
            <div className='admin_sidebar'>
                {sidebarItems.map((item) =>
                    <Link className={bar == item.content ? 'active_sidebar_item admin_sidebar_item' : 'admin_sidebar_item'} to={item.href} key={item.id} onClick={() => handleClick(item.content)}>
                        <p>{item.content}</p>
                    </Link>
                )}
            </div>
            <Outlet />
        </div>
    );
}

export default Dashboard;