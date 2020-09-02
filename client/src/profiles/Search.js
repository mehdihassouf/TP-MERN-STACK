import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByUserName } from '../../actions/profile'

const Search = ({ getProfileByUserName, profile: { profiles, loading } , match }) => {

    document.title = 'Ressult for : "' + match.params.userName + '"'

    useEffect(() => {
        getProfileByUserName(match.params.userName);
    }, [getProfileByUserName, match.params.userName]);

    const [formData, setFormData] = useState({
        sortBy: ''
    });

    const {sortBy } = formData;

    if (sortBy == 'gender') {
        profiles.sort((a, b) => {
            if (a.gender > b.gender) {
                return 1
            } else {
                return -1
            }
        });
    } else if (sortBy == 'dob') {
        profiles.sort((a, b) => {
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

            <h1 className='large text-primary'>Result for "{match.params.userName}"</h1>
            
            <br /><br />

            {loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                            <div className="w-1 mr-5">
                                <select className="custom-select" name="sortBy" value={sortBy} onChange={e => onChange(e)}>
                                    <option value="0">Sort By :</option>
                                    <option value="dob">Sort by BirthDay</option>
                                    <option value="gender">Sort by Gender</option>
                                </select>
                                <br /><br />
                            </div>
                        <div className='profiles'>

                            {profiles.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Username</th>
                                            <th scope="col">email</th>
                                            <th scope="col">gender</th>
                                            <th scope="col">Birthday</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    {profiles.map(profile => (
                                        <tr>
                                            <td>{profile.userName}</td>
                                            <td>{profile.email}</td>
                                            <td>{profile.gender}</td>
                                            <td>{profile.dob}</td>
                                            <td>
                                                <Link to={`/profile/${profile._id}`}>
                                                    View Profile
                          </Link>
                                            </td>


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
Search.propTypes = {
    getProfileByUserName: propTypes.func.isRequired,
    profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfileByUserName }
)(Search);