import React from 'react'
import { Link } from 'react-router-dom'

const HallItem = ({ hallID, thumbnail, title, desc, category, deptID, dept }) => {

  return (
    <article className='hall'>
      <div className='hall_thumbnail'>
        <Link to={`/depalldetails/${hallID}`}>
          <img src={thumbnail} alt={title} />
        </Link>
      </div>
      <div className='hall_content'>
        <Link to={`/depalldetails/${hallID}`}>
          <h3>{title}</h3>
        </Link>
        <p>{desc}</p>
      </div>
      <div className='hall_footer'>
        <Link to={`/halls/users/dadasd`} className='hall_dept'>
          <div className='hall_dept_details'>
            <h5>Dept of {dept}</h5>
          </div>
        </Link>
        <Link to={`/halls/categories/${category}`} className='btn category'>{category}</Link>
      </div>

    </article>
  )
}

export default HallItem