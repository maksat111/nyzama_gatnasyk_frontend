import { message } from 'antd';
import Input from 'antd/es/input/Input';
import { React, useState } from 'react';
import { axiosInstance } from '../config/axios';

function Test() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleButton = () => {
        axiosInstance.post('auth/create', { username, password }).then((res) => {
            message.success('Ustunlikli!')
        }).catch((err) => message.error('Yalnyslyk!'));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100vw', height: '60vh', alignItems: 'center' }}>
            <input placeholder='Username' name='username' onChange={handleUsername} style={{ width: '100px' }} />
            <br />
            <input placeholder='Password' name='password' onChange={handlePassword} style={{ width: '100px' }} />
            <br />
            <button onClick={handleButton}>Submit</button>
        </div>
    );
}

export default Test;