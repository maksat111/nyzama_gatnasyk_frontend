import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { LoadingOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import './Login.css'
// import { axiosInstance } from '../../utils/axiosIntance';
import { message } from 'antd';

const Login = () => {
    // const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("password");
    const handleSubmit = (e) => {
        // e.preventDefault();
        // setLoading(true);
        // axiosInstance.post('admin/login', { email, password }).then(res => {
        //     console.log(res)
        //     if (res.data.login) {
        //         message.success("Üstünlükli!");
        //         localStorage.setItem('TDY-token', res.data.token);
        //         // history.push('/requests');
        //         window.location.href = "/requests";
        //     }
        //     if (!res.data.login) {
        //         message.error(res.data.msg);
        //     }
        //     setLoading(false);
        // }).catch((err) => {
        //     message.error(err.message);
        //     setLoading(false);
        // });
    }
    return (
        <div className='login_page'>
            <form className="login-container" onSubmit={handleSubmit}>
                <h2>Hoş geldiňiz!</h2>
                <p>Programmany ulanmak üçin açar sözüňizi giriziň!</p>

                <div className='input-container'>
                    <UserOutlined className='icon' />
                    <input type="email" style={{ width: "395px" }} placeholder="Username" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className='input-container'>
                    <LockOutlined className='icon' />
                    <input type={type} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    {type == 'password' ? <EyeOutlined className='icon' style={!password ? { color: 'white' } : { color: "rgb(73, 73, 231)" }} onClick={() => setType("text")} />
                        : <EyeInvisibleOutlined className='icon' onClick={() => setType("password")} />
                    }
                </div>

                <button type="submit">{loading ? <LoadingOutlined /> : "Log In"}</button>
            </form>
        </div>
    )
}

export default Login;