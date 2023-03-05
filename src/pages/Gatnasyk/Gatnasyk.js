import { React, useState, useEffect } from 'react';
import { Input, Table, message, Space } from 'antd';
import { axiosInstance } from '../../config/axios';
import './Gatnasyk.css';
import Checkbox from 'antd/es/checkbox/Checkbox';

function Gatnasyk() {
    const [gozlegInput, setGozlegInput] = useState(null);
    const [gozlegdata, setGozlegData] = useState(null);
    const [groups, setGroups] = useState([]);
    const [activeSidebar, setActiveSidebar] = useState(null);
    const [tableData, setTableData] = useState([]);

    // Table datas and settings
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
            title: 'Wagtynda gelmedi',
            key: 'late',
            dataIndex: 'late',
            width: '150px',
            onChange: (record) => console.log(record),
            render: (_, record) => (
                <Checkbox name='late' onChange={(e) => {
                    const index = tableData.findIndex(item => item.key == record.key);
                    setTableData(previousState => {
                        let a = [...previousState];
                        a[index].late = e.target.checked;
                        return a;
                    })
                }} />
            ),

        },
        {
            title: 'Talaba laýyk däl',
            key: 'uniform',
            dataIndex: 'uniform',
            width: '200px',
            render: (_, record) => (
                <Checkbox style={{ color: 'rgb(7, 7, 175)' }} name='uniform' onChange={(e) => {
                    const index = tableData.findIndex(item => item.key == record.key);
                    setTableData(previousState => {
                        let a = [...previousState];
                        a[index].uniform = e.target.checked;
                        return a;
                    })
                }} />
            ),
        },
        {
            title: 'Bellik',
            key: 'note',
            dataIndex: 'note',
            render: (_, record) => (<Input
                name='note'
                style={{ width: '320px' }}
                placeholder='Bellik...'
                bordered={false}
                onChange={(e) => {
                    const index = tableData.findIndex(item => item.key == record.key);
                    setTableData(previousState => {
                        let a = [...previousState];
                        a[index].note = e.target.value;
                        return a;
                    })
                }}
            />
            ),
            width: '400px'
        },
    ];

    useEffect(() => {
        axiosInstance.get('/groups').then(async (data) => {
            let tableData = [];
            setGroups(data.data.data);
            setActiveSidebar(data.data.data[0]);
            const table = await axiosInstance.get(`students/${data.data.data[0]._id}`);
            table.data.data.map((item) => tableData.push({
                key: item._id,
                name: item.name,
                surname: item.surname,
                late: false,
                uniform: false,
                note: null
            }))
            setTableData(tableData);
        }).catch(err => {
            message.error('Yalnyslyk!')
        })
    }, [])

    // search options and etc
    const handleSearch = (event) => {
        setGozlegInput(event.target.value);
    }

    useEffect(() => {
        if (gozlegInput) {
            axiosInstance.get(`/groups/search?group_number=${gozlegInput}`).then((res) => {
                console.log(res)
                setGozlegData(res.data.data);
            }).catch((err) => {
                message.error('Yalnyslyk!');
            })
        }
    }, [gozlegInput])


    ///sidebar functions
    const handleSidebarSelect = async (item) => {
        let tableData = [];
        setActiveSidebar(item);
        const table = await axiosInstance.get(`students/${item._id}`);
        table.data.data.map((item) => tableData.push({
            key: item._id,
            name: item.name,
            surname: item.surname,
            late: false,
            uniform: false,
            note: null
        }))
        setTableData(tableData);
    }

    //confirm the breakings
    const handleConfirm = async () => {
        const filtered = tableData.filter(item => item.late == true || item.uniform == true || item.note !== null);
        filtered.forEach(element => {
            element.student_id = element.key;
            delete element.key
            delete element.name
            delete element.surname
        });

        const index = groups.findIndex((item) => item._id == activeSidebar._id);
        const lastIndex = groups.length - 1;

        index == lastIndex ? setActiveSidebar(groups[0]) : setActiveSidebar(groups[index + 1]);

        await axiosInstance.post('breaking/create', filtered);
        message.success('Üstünlikli tassyklandy!');
        let a = [];
        const table = await axiosInstance.get(`students/${index == lastIndex ? groups[0]._id : groups[index + 1]._id}`);
        table.data.data.map((item) => a.push({
            key: item._id,
            name: item.name,
            surname: item.surname,
            late: false,
            uniform: false,
            note: null
        }))
        setTableData(a);
    }

    return (
        <div className='gatnasyk_page' >
            <div className='gatnasyk_sidebar_container'>
                <Input style={{ marginBottom: '15px' }} size='large' placeholder='Gözleg...' onChange={handleSearch} value={gozlegInput} allowClear />
                {gozlegInput == null || gozlegInput == ''
                    ? groups?.map((item) =>
                        <div
                            className={item == activeSidebar ? `gatnasyk_sidebar_item active_gatnasyk_sidebar` : 'gatnasyk_sidebar_item'}
                            key={item._id}
                            onClick={() => handleSidebarSelect(item)}
                        >
                            <p>{item.group_number}</p>
                        </div>
                    )
                    : gozlegdata?.map((item) =>
                        <div
                            className={item == activeSidebar ? `gatnasyk_sidebar_item active_gatnasyk_sidebar` : 'gatnasyk_sidebar_item'}
                            key={item._id}
                            onClick={() => handleSidebarSelect(item)}
                        >
                            <p>{item.group_number}</p>
                        </div>
                    )}
            </div>
            <div className='gatnasyk_right_side'>
                <Table
                    style={{ fontSize: '17px' }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                />
                <div className='tassykla_button' onClick={handleConfirm}>Tassyklamak</div>
            </div>
        </div >
    );
}

export default Gatnasyk;