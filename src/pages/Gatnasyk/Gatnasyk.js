import { React, useState } from 'react';
import { Input, Table, message, Space } from 'antd';
import { axiosInstance } from '../../config/axios';
import './Gatnasyk.css';

function Gatnasyk() {
    const [gozlegInput, setGozlegInput] = useState('');
    const [tableData, setTableData] = useState([]);

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
            title: 'Gijä galmak',
            key: 'late',
            render: (_, record) => (
                < Space size="middle" >
                    <div className='delete_student' onClick={async () => {
                        await axiosInstance.delete(`/students/delete/${record.key}`);
                        const index = tableData.filter(item => item.key !== record.key);
                        setTableData(index);
                        message.success('Ustunlukli!')
                    }}>Delete</div>
                </Space >
            ),
        },
        {
            title: 'Lybasy talaba laýyk däl',
            key: 'uniform',
            render: (_, record) => (
                < Space size="middle" >
                    <div className='delete_student' onClick={async () => {
                        await axiosInstance.delete(`/students/delete/${record.key}`);
                        const index = tableData.filter(item => item.key !== record.key);
                        setTableData(index);
                        message.success('Ustunlukli!')
                    }}>Delete</div>
                </Space >
            ),
        },
        {
            title: 'Topary',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                < Space size="middle" >
                    <div className='delete_student' onClick={async () => {
                        await axiosInstance.delete(`/students/delete/${record.key}`);
                        const index = tableData.filter(item => item.key !== record.key);
                        setTableData(index);
                        message.success('Ustunlukli!')
                    }}>Delete</div>
                </Space >
            ),
        },
    ];

    const handleSearch = (event) => {
        setGozlegInput(event.target.value);
    }
    return (
        <div className='gatnasyk_page'>
            <div className='gatnasyk_sidebar_container'>
                <Input style={{ marginBottom: '15px' }} size='large' placeholder='Gözleg...' onChange={handleSearch} value={gozlegInput} allowClear />
                <div className='gatnasyk_sidebar_item active_gatnasyk_sidebar'>
                    <p>3331</p>
                </div>
                <div className='gatnasyk_sidebar_item'>
                    <p>3331</p>
                </div>
                <div className='gatnasyk_sidebar_item'>
                    <p>3331</p>
                </div>
            </div>
            <div className='gatnasyk_left_side'>
                <Table columns={columns} dataSource={tableData} pagination={false} />
            </div>
        </div>
    );
}

export default Gatnasyk;