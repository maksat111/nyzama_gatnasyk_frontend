import React from 'react';
import './Admin.css';

function Dashboard() {
    return (
        <div className='admin_page'>
            <div className='admin_sidebar'>
                <div className='admin_sidebar_item'>
                    <p>Talyplar</p>
                </div>
                <div className='admin_sidebar_item'>
                    <p>Ulanyjylar</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;