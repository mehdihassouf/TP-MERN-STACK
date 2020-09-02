import React, { Fragment, useEffect} from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const MOCK = ({ getProfiles, setAlert, register, profile: { profiles, loading } }) => {

    document.title = 'MOCK';
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    

    const addUser = async (e) => {
        let res  = await fetch("https://randomuser.me/api")
            .then(res => res.json())
            .then(data => {
                const getenUser = data.results[0]
                let user = {
                    userName: getenUser.name.title + ' ' + getenUser.name.first + ' ' + getenUser.name.last,
                    gender: getenUser.gender,
                    dob: getenUser.dob.date,
                    news: 'false',
                    email: getenUser.email,
                    skills: '',
                    status: '',
                    bio: '',
                    avatar : getenUser.picture.large
                }
                register(user)
                console.log(user)
            })
    }

    const getUsersNumber = () => {
        getProfiles();
        let i = 100 - profiles.length
        document.getElementById("exp-1").innerHTML = "you need " + i + " users";
    }


    if (profiles.length > 100) {
        document.getElementById('btn').disabled  = true

    }

    return (
        loading ? (
            <Spinner />
        ) : (
                
            <Fragment>
                <button className="btn-primary btn" id="btn" onClick={e => getUsersNumber(e)}>
                        How much users you need to get 100 users ?
                </button>
                    <br /><br />
                    <p id="exp-1" />
                    
                <button className="btn-primary btn" id="btn" onClick={ e => addUser(e)}>
                        Click me to add a user from  https://randomuser.me
                </button>
                    <br /> <br /> <br />
                
                    

                </Fragment>
            )
    )
}

MOCK.propTypes = {
    getProfiles: propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
    register: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfiles, setAlert, register}
)(MOCK);