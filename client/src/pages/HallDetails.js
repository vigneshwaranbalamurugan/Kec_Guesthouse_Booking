import React from 'react'
import { Link } from 'react-router-dom'

const HallDetails = () => {
  return (
    <section className='hall_detail'>
      <div className='hall_detail_header'>
        {/* <HallDept/> */}
        <div className='hall_detail_buttons'>
          <Link to={`/halls/asdf/edit`} className='btn sm primary'>Create</Link>
          <Link to={`/halls/asdf/delete`} className='btn sm danger'>Remove</Link>
        </div>
      </div>
    </section>
  )
}

export default HallDetails