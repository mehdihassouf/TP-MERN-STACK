import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills, userName } }) => {

  return(
    <div className='profile-about bg-dark p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{userName.trim().split(' ')[0]} 's Bio</h2>
          <p className="text-light">{bio}</p>
          <div className='line' />
        </Fragment>
      )}
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        <div className="text-light text-monospace">
          <i className='fas fa-check' /> {skills.toString()}
          <br/><br/>
        </div>   
      </div>
    </div>)
};

ProfileAbout.propTypes = {
  profile: propTypes.object.isRequired
};

export default ProfileAbout;