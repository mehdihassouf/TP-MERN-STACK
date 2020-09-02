import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true, 
    user : null
} 

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                ...payload, 
                saved :true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem(('token'));
            return {
                ...state, 
                token: null,
                saved :false,
                loading : false
            }
        default:
            return state;
    }
}
