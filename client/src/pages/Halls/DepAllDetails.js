import React from 'react';
import { Link, useParams } from 'react-router-dom';
import halldept from '../../components/Ddata';

const DepAllDetails = () => {
  const { id } = useParams();
  const department = halldept.find(dep => dep.id === parseInt(id));

  if (!department) {
    return <div>No department found for the given id</div>;
  }

  return (
    <section className='halls'>
      <div className='container hall_container'>
        {department.halls.map((hall, index) => (
          <div key={index}>
            <article className='hall'>

              <div className='hall_thumbnail'>
                <Link to={`/dephalldetails/${hall.id}`}>
                  <img src={hall.thumbnail} alt={hall.name} />
                </Link>
              </div>
              <div className='hall_content'>
                <Link to={`/dephalldetails/${hall.id}`}>
                  <h3>{hall.name}</h3>
                </Link>
                <p>Fan: {hall.fan}</p>
                <p>Whiteboard: {hall.Whiteboard}</p>
                <p>Projector: {hall.Projector}</p>
              </div>
              <div className='hall_footer'>
                <Link to={`/halls/users/dadasd`} className='hall_dept'>
                  <div className='hall_dept_details'>
                    <h5>Capacity: {hall.Capacity}</h5>
                  </div>
                </Link>
                <Link to={`/halls/categories/${hall.ac}`} className='btn category'>{hall.ac}</Link>
              </div>

            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepAllDetails;
