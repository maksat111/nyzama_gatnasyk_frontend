import { DeleteOutlined } from '@ant-design/icons';
import { Select, Drawer, Table, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config/axios';
import './Talyplar.css';

function Talyplar() {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState(null);
    const [select, setSelect] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [studentForm, setStudentForm] = useState({
        name: '',
        surname: '',
        group: '',
        major: '',
        course: ''
    })

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        axiosInstance.get('/groups').then(async (data) => {
            setGroups(data.data.data);
            let selectOptions = [];
            let tableData = [];
            data.data.data.map(item => {
                selectOptions.push({ label: item.group_number, value: item._id });
            });
            if (data.data.data.length > 0) {
                const table = await axiosInstance.get(`students/${data.data.data[0]?._id}`);
                table.data.data.map((item) => tableData.push({
                    key: item._id,
                    name: item.name,
                    surname: item.surname,
                    major: item.group_id.group_major,
                    course: item.group_id.course,
                    group: item.group_id.group_number
                }))
                setTableData(tableData);
                setSelect(selectOptions);
            }
        }).catch(err => {
            message.error('Yalnyslyk!')
            console.log(err);
        })
    }, [])

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
            title: 'Taýýarlygynyň ugry',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Taýýarlygynyň ýyly',
            dataIndex: 'course',
            key: 'course',
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

    const handleSelect = async (e) => {
        let tableData = [];
        const table = await axiosInstance.get(`/students/${e}`);
        table.data.data.map((item) => tableData.push({
            key: item._id,
            name: item.name,
            surname: item.surname,
            major: item.group_id.group_major,
            course: item.group_id.course,
            group: item.group_id.group_number
        }))
        setTableData(tableData);
    }


    const handleForm = (e) => {
        setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
    }

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            const data = await axiosInstance.post('/students/create', studentForm);
            setStudentForm({
                name: '',
                surname: '',
                group: '',
                major: '',
                course: ''
            });
            message.success("Üstünlikli goşuldy!")
        } catch (err) {
            message.error('Yalnyşlyk! Maglumatlaryňyzyň dogrulugyny barlaň!')
        }
    }

    return (
        <div className='talyplar_container'>
            <div className="upper">
                <Select
                    size='large'
                    defaultValue={'Topar saýlamak'}
                    options={select}
                    onSelect={handleSelect}
                    style={{
                        width: 200,
                    }}
                />
                <div>
                    <div className='add_student_button' onClick={showDrawer}>Goşmak</div>
                    <Drawer title="Talybyň maglumatlaryny giriziň" width={'500px'} placement="right" onClose={onClose} open={open}>
                        <form onSubmit={handleAdd}>
                            <div className='add_student_details' onSubmit={handleAdd}>
                                <div className='drawer_left_side'>
                                    <p>Ady:</p>
                                    <p>Familiýasy:</p>
                                    <p>Taýýarlygynyň ugry:</p>
                                    <p>Taýýarlygynyň ýyly:</p>
                                    <p>Topary:</p>
                                </div>
                                <div className='drawer_right_side'>
                                    <input placeholder='Ady' name='name' required value={studentForm.name} onChange={handleForm} />
                                    <input placeholder='Familiýasy' name='surname' required value={studentForm.surname} onChange={handleForm} />
                                    <input placeholder='Taýýarlygynyň ugry' name='major' required value={studentForm.major} onChange={handleForm} />
                                    <input type='number' placeholder='Taýýarlygynyň ýyly' name='course' required value={studentForm.course} onChange={handleForm} />
                                    <input type='number' placeholder='Topary' name='group' required value={studentForm.group} onChange={handleForm} />
                                </div>
                            </div>
                            <button type='submit' style={{ margin: '30px auto', border: 'none' }} className='add_student_button' onClick={handleAdd}>Goşmak</button>
                        </form>
                    </Drawer>
                </div>
            </div>

            <Table columns={columns} dataSource={tableData} pagination={false} />

        </div>
    );
}

export default Talyplar;