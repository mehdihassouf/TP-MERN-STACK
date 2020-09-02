import React, { Fragment, useEffect , useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById, UpdateProfile } from '../../actions/profile';

const EditProfile = ({ getProfileById, UpdateProfile ,
    profile: { profile, loading }, match , saved }) => {

    if (saved) {
       window.location.href = `/profile/${profile._id}`;
    }
    
    let title;

    
        if (profile) {
            title = "Edit " + profile.userName +"'s profile"
        } else {
            title = 'Profile Not Found'
        }

    if (loading) {
        profile = {
            userName: '',
            gender: '',
            dob: '',
            news:'' ,
        }
        
    }

    const [formData, setFormData] = useState({
        /*userName: profile.userName,
        gender: profile.gender,
        dob: profile.dob,
        news: profile.news,*/
        email:'',
        skills: '',
        status: '',
        bio: ''
    });
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        UpdateProfile ({ userName, gender, dob, email, news, skills, status, bio } , profile._id);
    };


    const { userName, gender, dob, email, news, skills, status, bio } = formData;


    document.title = title;

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (

                    <Fragment>
                        {profile ? (
                            
                            <Fragment>
                                <div>
                                    <h1 className="card-title">Edit {profile.userName} Profile</h1>
                                    <form id="form" onSubmit={_e => onSubmit()} action='/create-profile'>
                                    <div id="validationServer03Feedback" className="invalid-feedback">
                                    </div>
                                    <div className="form-group">
                                        <label >Username</label>
                                        <input type="text" className="form-control disabled" id="InputUserName" name="userName" value={userName} onChange={e => onChange(e)} required  />
                                    </div>
                                    <div className="form-group" >
                                        <div className="d-inline mr-3 ">
                                            <label>Gender</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input disabled" id="exampleRadios1" name="gender" value="female" onChange={e => onChange(e)} required />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input disabled" id="exampleRadios1" name="gender" value="male" onChange={e => onChange(e)}  />
                                            <label className="form-check-label" >Male</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" id="InputEmail" name="email" value={email} onChange={e => onChange(e)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Birth Day</label>
                                        <input type="date" className="form-control" id="InputBirthDay" name="dob" value={dob} onChange={e => onChange(e)}  required />
                                    </div>
                                    <div className="form-group" >
                                        <select className="custom-select" name="status" onChange={e => onChange(e)}>
                                            <option value="0">* Select Professional Status</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Junior Developer">Junior Developer</option>
                                            <option value="Senior Developer">Senior Developer</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Student or Learning">Student or Learning</option>
                                            <option value="Instructor">Instructor or Teacher</option>
                                            <option value="Intern">Intern</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <small className="form-text"
                                            >Give us an idea of where you are at in your career</small
                                        >
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} required />
                                        <small className="text-white-50">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
                                    </div>
                                    <div className="form-group">
                                        <textarea className='form-control' placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)} required ></textarea>
                                        <small className="text-white-50">Tell us a little about yourself</small>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" name="news" value="true" className="custom-control-input" id="customSwitch1" onChange={e => onChange(e)} />
                                            <label className="custom-control-label" htmlFor="customSwitch1" >News</label>
                                        </div>
                                    </div>
                                    <br />
                                    <button onClick={e => onSubmit(e)} type="submit" className="btn btn-primary">Register</button>
                                    </form>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="container">        
                            </div>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    );
};

EditProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    saved: state.auth.saved
});

export default connect(mapStateToProps, { getProfileById, UpdateProfile })(EditProfile);