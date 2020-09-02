import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById , deleteUser  } from '../../actions/profile';

const Profile = ({ getProfileById, deleteUser,
  profile: { profile, loading }, match }) => {
  
  let title;

  if (loading) {
    title = 'Laoding ...';
  } else {
    if (profile) {
      title = profile.userName
    }else{
      title = 'Profile Not Found'
    }
  }

  document.title = title;

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);


  const onClick = (e) => {
    let confirmation = window.confirm("Are you sure you want to delete " + profile.userName + "'s profile ?");
    if (confirmation) {
      deleteUser(profile._id)
      
    }
  }
  
  return (
    <Fragment>
      {loading ? (
          <Spinner />
      ) : (
          
          <Fragment>
            <Link to="/" className="mr- btn btn-light">Back To Profiles</Link>
            {profile ? (
              <Fragment>
                <Link to={`/edit-profile/${profile._id}`} className="mr- btn btn-dark">Edit Profile</Link>
                <div className="btn btn-danger" onClick= { e => onClick(e) } >
                  
                  <i className="fas fa-trash"></i>
                </div>
                
                <br/><br/>
                <ProfileTop profile={profile} /><ProfileAbout profile={profile} />
              </Fragment>
            ) : (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="error-template">
                        <div className="error-details">
                          Sorry, This profile does not exist !
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}    
          </Fragment>
        )
        }
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUser : PropTypes.func,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById, deleteUser})(Profile);