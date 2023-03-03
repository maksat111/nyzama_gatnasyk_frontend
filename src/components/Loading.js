import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import './Loading.css';

function Loading({ size }) {
    return (
        <div className='loading_container'>
            <LoadingOutlined style={{ fontSize: `${size}`, color: 'rgb(7, 7, 175)' }} />
        </div>
    );
}

export default Loading;