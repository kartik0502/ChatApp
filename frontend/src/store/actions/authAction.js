import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType';

export const userRegister = (data) => {
    return async (dispatch) => {
    // console.log(data);
        
        try{
            const response = await axios.post('/api/messenger/user-register',data);
            localStorage.setItem('authToken',response.data.token);
            dispatch({
                type : REGISTER_SUCCESS,
                payload : {
                    successMessage : response.data.successMessage,
                    token : response.data.token
                }
            });
        }
        catch(error){
            console.log(error.response.data.error.errorMessage);
            dispatch({
                type : REGISTER_FAIL,
                payload : {
                    error : error.response.data.error.errorMessage
                }
            }); 
        }
    }
}

export const userLogin = (data) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/messenger/user-login',data);
            localStorage.setItem('authToken',response.data.token);
            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : {
                    successMessage : response.data.successMessage,
                    token : response.data.token
                }
            });
        }
        catch(error){
            console.log(error.response.data.error.errorMessage);
            dispatch({
                type : USER_LOGIN_FAIL,
                payload : {
                    error : error.response.data.error.errorMessage
                }
            }); 
        }
    }
}