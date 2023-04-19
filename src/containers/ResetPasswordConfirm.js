import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import  { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

// TODO: Use confirmation response and redux state to show user any errors from backend instead of just routing to home 

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const routeParams = useParams();

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const OnSubmit = e => {
        e.preventDefault();
        
        const uid = routeParams.uid;
        const token = routeParams.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    // TODO: Make sure things were successful first
    if (requestSent) {
        return <Navigate to='/'/>
    }

    return (
        <div style={{
            paddingLeft: 50,
            paddingRight: 50
        }}>
            <h1>Reset Password</h1>
            <form onSubmit={e => OnSubmit(e) } >
                <div>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <div style={{
                    paddingTop: 5,
                    paddingBottom: 20
                }}>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};


export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);