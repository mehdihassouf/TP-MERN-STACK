import axios from 'axios';
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//register user 

export const register = ({ userName, gender, dob, news, email , skills , status , bio , avatar }) => async dispatch => {
    const config = {
        headers : {'Content-Type': 'application/json'}
    }
    const newUser= {
        userName,
        gender,
        dob,
        news,
        email,
        skills,
        status,
        bio,
        avatar
    }
    const body = JSON.stringify(newUser);
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg , 'danger' , 3000))
            });
            console.log(errors)
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}
