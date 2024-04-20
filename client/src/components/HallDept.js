import React from 'react'
import { Link } from 'react-router-dom'

const HallDept = () => {
  return (
    <Link to={`halls/:id`} className='hall_dept'>
      <div className='hall_dept_details'>
        <h5>Dept of CSE</h5>
      </div>
    </Link>
  )
}

export default HallDept
