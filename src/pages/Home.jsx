import React from 'react';
import ProfileForm from '../components/ProfileForm';

function Home() {
  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-8 md-order-1 sm-order-2 mx-auto'>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
