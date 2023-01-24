import React from 'react';
import { Button, Result } from 'antd';
import "./NotFound.css";

const NotFound = () => {

    return (
        <div className='not_found_container'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        </div>
    )
};

export default NotFound;