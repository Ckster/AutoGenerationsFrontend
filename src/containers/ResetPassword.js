import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import  { connect } from 'react-redux';
import { reset_password } from '../actions/auth';


const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    };

    // TODO: Tell user to check their email unless this is already happening
    if (requestSent) {
        return <Navigate to='/'/>
    }

    return (
        <div style={{
            paddingLeft: 50,
            paddingRight: 50
        }}>
            <h1>Request Password Reset</h1>
            <form onSubmit={e => onSubmit(e) } >
                <div>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};


export default connect(null, { reset_password })(ResetPassword);