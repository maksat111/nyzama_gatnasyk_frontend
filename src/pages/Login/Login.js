import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { LoadingOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import './Login.css'
import { loginPost } from '../../config/axios';
import { message } from 'antd';

const Login = () => {
    // const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("password");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginPost(username, password);
        console.log(res)
        if (res.success == 1) {
            localStorage.setItem('nyzam_profile_info', JSON.stringify(res.data));
            message.success('Successfully!');
            window.location.href = "/requests"
            setLoading(false);
        } else {
            message.error(res.msg);
            setLoading(false);
        }

    }
    return (
        <div className='login_page'>
            <form className="login-container" onSubmit={handleSubmit}>
                <h2>Hoş geldiňiz!</h2>
                <p>Programmany ulanmak üçin açar sözüňizi giriziň!</p>

                <div className='input-container'>
                    <UserOutlined className='icon' />
                    <input style={{ width: "395px" }} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className='input-container'>
                    <LockOutlined className='icon' />
                    <input type={type} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    {type == 'password' ? <EyeOutlined className='icon' style={!password ? { color: 'white' } : { color: "rgb(73, 73, 231)" }} onClick={() => setType("text")} />
                        : <EyeInvisibleOutlined className='icon' onClick={() => setType("password")} />
                    }
                </div>

                <button className='login_button' type="submit">{loading ? <LoadingOutlined /> : "Log In"}</button>
            </form>
        </div>
    )
}

export default Login;