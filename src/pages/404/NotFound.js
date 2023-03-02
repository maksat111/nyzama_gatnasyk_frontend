import React from 'react';
import { Button, Result } from 'antd';
import "./NotFound.css";

const NotFound = () => {

    return (
        <div className='not_found_container'>
            <Result
                status="404"
                title="404"
                subTitle="Bagyşlaň, siziň gözleýän sahypaňyz tapylmady!"
            />
        </div>
    )
};

export default NotFound;