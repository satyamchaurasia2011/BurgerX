import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
       return{
        type : actionTypes.AUTH_START
       } 
};

export const authSuccess = (token, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    };
};

export const authFailure = (error) => {
    return {
        type : actionTypes.AUTH_FAILURE,
        error : error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.LOGOUT
    };
};

export const checkAuthTime = (expiresTimeOut) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresTimeOut*1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9D2soaOB8Dg_X9f_mxFk-SfQVMyiAw30';
        if(!isSignup)
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9D2soaOB8Dg_X9f_mxFk-SfQVMyiAw30';
        axios.post(url, authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTime(res.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailure(err.response.data.error));
        });
    };
}; 

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    };
}