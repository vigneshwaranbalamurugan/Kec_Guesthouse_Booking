import React from 'react'
import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <section className='error-page'>
      <div className='center'>
        <Link to='/' className='btnPrimary'>Go Back Home</Link>
        <h2>Page not Found</h2>
      </div>

    </section>
  )
}

export default Error