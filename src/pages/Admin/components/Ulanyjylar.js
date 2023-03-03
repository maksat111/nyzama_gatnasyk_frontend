import { React, useEffect, useState } from 'react';
import { Drawer, Table, Space, message } from 'antd';
import './Ulanyjylar.css';
import { axiosInstance } from '../../../config/axios';

function Ulanyjylar() {
    const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [userForm, setUserForm] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
    })

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        axiosInstance.get('teacher').then((res) => {
            let tableData = [];
            res.data.data.map(item => tableData.push({
                key: item._id,
                name: item.name,
                surname: item.surname,
                username: item.username,
                created_at: item.created_at
            }));
            setTableData(tableData);
        }).catch((err) => {
            message.error('yalnyslyk!')
        })
    }, [])

    const data = [
        {
            key: 1,
            name: "Maksat",
            surname: "Akmyradow",
            username: 'Mobil we tor Inziniring',
            created_at: 3,
        }
    ]

    const columns = [
        {
            title: 'Ady',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Familiýasy',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Ulanyjy ady',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Goşulan wagty',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div className='delete_teacher' onClick={async () => {
                        await axiosInstance.delete(`/teacher/delete/${record.key}`);
                        const index = tableData.filter(item => item.key !== record.key);
                        setTableData(index);
                        message.success('Ustunlukli!')
                    }} >Delete</div>
                </Space>
            ),
        },
    ];

    const handleForm = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    }

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            const data = await axiosInstance.post('/teacher/create', userForm);
            setUserForm({
                name: '',
                surname: '',
                username: '',
                password: '',
            })
            message.success("Üstünlikli goşuldy!")
        } catch (err) {
            message.error('Ýalňyşlyk! Maglumatlaryňyzyň dogrulygyny barlaň!')
        }
    }

    return (
        <div className='ulanyjylar_container'>
            <div className='ulanyjylar_upper'>
                <div className='add_user_button' onClick={showDrawer}>Goşmak</div>
                <Drawer title="Ulanyjynyň maglumatlaryny giriziň" width='500px' placement="right" onClose={onClose} open={open}>
                    <form onSubmit={handleAdd}>
                        <div className='add_teacher_details' onSubmit={handleAdd}>
                            <div className='drawer_left_side'>
                                <p>Ady:</p>
                                <p>Familiýasy:</p>
                                <p>Ulanyjy ady:</p>
                                <p>Açar sözi:</p>
                            </div>
                            <div className='drawer_right_side'>
                                <input placeholder='Ady' name='name' required value={userForm.name} onChange={handleForm} />
                                <input placeholder='Familiýasy' name='surname' required value={userForm.surname} onChange={handleForm} />
                                <input placeholder='Ulanyjy ady' name='username' required value={userForm.username} onChange={handleForm} />
                                <input placeholder='Açar sözi' name='password' required value={userForm.password} onChange={handleForm} />
                            </div>
                        </div>
                        <button type='submit' style={{ margin: '30px auto', border: 'none' }} className='add_teacher_button' onClick={handleAdd}>Goşmak</button>
                    </form>
                </Drawer>
            </div>
            <Table columns={columns} dataSource={tableData} pagination={false} />
        </div>
    );
}

export default Ulanyjylar;