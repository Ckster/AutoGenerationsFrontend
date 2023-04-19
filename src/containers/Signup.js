import React, { useState } from 'react';
import {signup } from '../actions/auth';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';


const SignUp = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://localhost:3000`)
            window.location.replace(res.data.authorization_url);

            

        }
        catch (err) {

        }
    };

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
        else {
            // TODO: Tell user their passwords need to match 
        }
    };

    // TODO: Tell user to check their email for a verification link before navigating or don't navigate at all / have a resend button
    if (isAuthenticated) {
        return <Navigate to='/authed'/>
    }
    if (accountCreated) {
        return <Navigate to='/login'/>
    }

    return (
        <div style={{
            paddingLeft: 50,
            paddingRight: 50
        }}>
            <h1>Sign Up</h1>
            <p>Create your AutoGenerations Account</p>
            <form onSubmit={e => onSubmit(e) } >
                <div>
                    <input
                        className='form-control'
                        type='name'
                        placeholder='Name*'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div style={{
                    paddingTop: 5,
                    paddingBottom: 20
                }}>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
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
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength={8}
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
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength={8}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue with Google
            </button>
            <p className='mt-3'>
                Already have an account? <Link to='/signup'>Sign In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps, { signup })(SignUp);