import { React, useState, useEffect } from 'react';
import { Input, Table, message, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import date from 'date-and-time';
import { axiosInstance } from '../../config/axios';
import '../Gatnasyk/Gatnasyk.css';
import './Hasabat.css';
import Checkbox from 'antd/es/checkbox/Checkbox';
dayjs.extend(customParseFormat);


function Gatnasyk() {
    const [gozlegInput, setGozlegInput] = useState(null);
    const [gozlegdata, setGozlegData] = useState(null);
    const [groups, setGroups] = useState([]);
    const [activeSidebar, setActiveSidebar] = useState(null);
    const [tableData, setTableData] = useState([]);
    const today = date.format(new Date(), 'YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState(today);
    const dateFormat = 'YYYY-MM-DD';


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
            render: (_, record) => (
                <Checkbox name='late' disabled checked={record.late} />
            ),

        },
        {
            title: 'Talaba laýyk däl',
            key: 'uniform',
            dataIndex: 'uniform',
            width: '200px',
            render: (_, record) => (
                <Checkbox name='late' disabled checked={record.uniform} />
            ),
        },
        {
            title: 'Bellik',
            key: 'note',
            dataIndex: 'note',
            render: (_, record) => (<Input
                name='note'
                style={{ width: '320px' }}
                placeholder=' '
                bordered={false}
                disabled
                value={record.note}
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
            let table = await axiosInstance.get(`breaking?group_id=${data.data.data[0]._id}&&created_at=${today}`);

            table.data.data.forEach(element => {
                const index = element.breakingRules.findIndex(item => item.created_at == today);

                tableData.push({
                    key: element._id,
                    name: element.name,
                    surname: element.surname,
                    late: index == -1 ? false : element.breakingRules[index].late,
                    uniform: index == -1 ? false : element.breakingRules[index].uniform,
                    note: index == -1 ? null : element.breakingRules[index].note
                })
            });

            setTableData(tableData);
        }).catch(err => {
            console.log(err)
            message.error('Yalnyslyyyyk!')
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
        setActiveSidebar(item);
        let newData = []
        console.log(selectedDate)
        let table = await axiosInstance.get(`breaking?group_id=${item._id}&&created_at=${selectedDate}`);

        table.data.data.forEach(element => {
            const index = element.breakingRules.findIndex(item => item.created_at == selectedDate);

            newData.push({
                key: element._id,
                name: element.name,
                surname: element.surname,
                late: index == -1 ? false : element.breakingRules[index].late,
                uniform: index == -1 ? false : element.breakingRules[index].uniform,
                note: index == -1 ? null : element.breakingRules[index].note
            })
        });

        setTableData(newData);
    }

    const handleDatePicker = async (date, dateString) => {
        try {
            setSelectedDate(dateString);
            let newData = []

            let table = await axiosInstance.get(`breaking?group_id=${activeSidebar._id}&&created_at=${dateString}`);

            table.data.data.forEach(element => {
                const index = element.breakingRules.findIndex(item => item.created_at == dateString);

                newData.push({
                    key: element._id,
                    name: element.name,
                    surname: element.surname,
                    late: index == -1 ? false : element.breakingRules[index].late,
                    uniform: index == -1 ? false : element.breakingRules[index].uniform,
                    note: index == -1 ? null : element.breakingRules[index].note
                })
            });

            setTableData(newData);
        } catch (err) {
            message.error("Yalnyslyk!")
        }
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
                <div className='datePicker_container'>
                    <DatePicker
                        placeholder='Wagtyny saýlaň...'
                        size='large'
                        style={{ width: '200px' }}
                        defaultValue={dayjs(today, dateFormat)}
                        onChange={handleDatePicker}
                    />
                </div>
                <Table
                    style={{ fontSize: '17px' }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                />
            </div>
        </div >
    );
}

export default Gatnasyk;