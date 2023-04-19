import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    CONFIRM_PASSWORD_FAIL,
    CONFIRM_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL, 
    RESET_PASSWORD_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL
} from './types';

axios.defaults.withCredentials = true;


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        console.log('ACCESS GOTTEN', localStorage.getItem('access'));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            console.log('response', res.data.code);
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            }
            else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        }
        catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    }
    else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}


export const load_user = (email, password) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch ({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        }
    
        catch (err) {
            dispatch ({
                type: USER_LOADED_FAIL
            });
        }
    }
    else {
        console.log('NOT FOUND IN STORAGE');
        dispatch ({
            type: USER_LOADED_FAIL
        });
    }

};


export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])).join('&');
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            dispatch ({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
        }
        catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
}


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    }

    catch (err) {
        dispatch ({
            type: LOGIN_FAIL
        });
    }
};


export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, re_password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        dispatch ({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    }

    catch (err) {
        dispatch ({
            type: SIGNUP_FAIL
        });
    }
};


export const activate = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        dispatch ({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
    }

    catch (err) {
        dispatch ({
            type: ACTIVATION_FAIL
        });
    }
}


export const reset_password = (email) => async dispatch => {
    const config  = {
        headers: {
            'Content-Type': 'application/json',
            'Referer': process.env.REACT_APP_API_URL,
            'X-CSRFToken': getCookie('csrftoken')
        }
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch ({
            type: RESET_PASSWORD_SUCCESS
        });
    }

    catch (err) {
        dispatch ({
            type: RESET_PASSWORD_FAIL
        });
    }

};


export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config  = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch ({
            type: CONFIRM_PASSWORD_SUCCESS
        });
    }

    catch (err) {
        dispatch ({
            type: CONFIRM_PASSWORD_FAIL
        });
    }

}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
