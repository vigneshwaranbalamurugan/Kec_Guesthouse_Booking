import React, { useState } from 'react'
import HallItem from '../components/HallItem'
import KecHalls from "../components/data.js"


const Hall = () => {
    const [halls, setHalls] = useState(KecHalls);
    return (
        <section className='halls'>
            <div className='container hall_container'>
            {halls.map(({ id, thumbnail,category, title, desc,deptID,dept }) => (
                <HallItem key={id} hallID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} deptID={deptID} dept={dept} />
            ))}
            </div>
        </section>
    );
};


export default Hall