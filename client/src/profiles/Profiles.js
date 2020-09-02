import React, { Fragment, useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  document.title= 'Profiles'

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  

  const [formData, setFormData] = useState({
    userName: '',
    sortBy:''
  });

  const { userName, sortBy } = formData;
  let arr = profiles.slice(0,10)

  if (sortBy == 'gender') {
    arr.sort((a, b) => {
      if (a.gender > b.gender) {
        return 1
      } else {
        return -1
      }
    });
  } else if (sortBy == 'dob') {
    arr.sort((a, b) => {
      if (a.dob > b.dob) {
        return 1
      } else {
        return -1
      }
    });
  }



  const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
      <Fragment>

        <h1 className='large text-primary'>Users</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop' /> Browse and connect with Users
        </p>



        <br /><br />

        {loading ? (
            <Spinner />
        ) : (
            <Fragment>
              <div className="d-flex">
                <div className="mr-5">
                  <div className="input-group flex-nowrap w-1">
                    <input type="text" className="form-control" name="userName" placeholder="Search"
                           aria-label="Username" aria-describedby="addon-wrapping" value={userName} onChange={e => onChange(e)} />
                    <Link to={`/${userName}`} className="input-group-prepend">
                      <span className="input-group-text" id="addon-wrapping"><i className="fas fa-search"></i></span>
                    </Link>
                  </div>
                </div>
                <div className="w-1 mr-5">
                  <select className="custom-select" name="sortBy" value={sortBy} onChange={e => onChange(e)}>
                    <option value="0">Sort By :</option>
                    <option value="dob">Sort by BirthDay</option>
                    <option value="gender">Sort by Gender</option>
                  </select>
                  <br /><br />
                </div>
              </div>
              <div className='profiles'>

                {profiles.length > 0 ? (
                    <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">Username</th>
                      <th scope="col">email</th>
                      <th scope="col">gender</th>
                      <th scope="col">Birthday</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  {arr.map(profile => (
                        <tr>
                          <td><img className="avatar" src={profile.avatar}/></td>
                            <td>{profile.userName}</td>
                            <td>{profile.email}</td>
                            <td>{profile.gender}</td>
                            <td>{profile.dob}</td>
                            <td><Link to={`/profile/${profile._id}`}>View Profile</Link></td>


                          </tr>


                      ))}
                    </table>
                ) : (
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="error-template">
                            <h1> Oops!</h1>
                            <div className="error-details">
                              No profiles found...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </Fragment>
        )}
      </Fragment>
  )
}
Profiles.propTypes = {
  getProfiles: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfiles }
)(Profiles);