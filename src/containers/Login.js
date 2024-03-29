import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import  { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://localhost:3000/authed`)
            window.location.replace(res.data.authorization_url);
        }
        catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Navigate to='/authed'/>
    }

    return (
        <div style={{
            paddingLeft: 50,
            paddingRight: 50
        }}>
            <h1>Sign In</h1>
            <p>Sign into your AutoGenerations Account</p>
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
                <div style={{
                    paddingTop: 5,
                    paddingBottom: 20
                }}>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue with Google
            </button>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps, { login })(Login);