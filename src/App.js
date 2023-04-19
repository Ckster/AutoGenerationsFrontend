import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import AuthHome from './containers/AuthHome';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/authed' element={<AuthHome/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/signup' element={<SignUp/>} />
            <Route exact path='/reset-password' element={<ResetPassword/>} />
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
            <Route exact path='/activate/:uid/:token' element={<Activate/>} />
          </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
