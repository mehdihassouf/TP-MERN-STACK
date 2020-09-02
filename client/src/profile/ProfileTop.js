import React from 'react';
import propTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    userName,
    avatar,
    email,
  }
}) => {
  return (
    <div className=' cont profile-top bg-primary p-2'>
      
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{userName}</h1>
      <h2 className="text-light" >{email}</h2>
      <p className='lead'>
        {status}
      </p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: propTypes.object.isRequired
};

export default ProfileTop;