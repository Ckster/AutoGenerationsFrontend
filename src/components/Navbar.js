import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
 
const Navbar = ({ logout, isAuthenticaed }) => {
    const logout_user = () => {
        logout();
    }

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
            <Link className="nav-link" aria-current="Home" to='/'> Home </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className="nav-item">
            <Link className="nav-link" aria-current="Home" to='/authed'> Home </Link>
            </li>
            <li className="nav-item">
            <a className="nav-link" aria-current="Logout" href="/" onClick={logout_user}>Logout</a>
            </li>
        </Fragment>
    );

    return(
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">AutoGenerations</Link>
                    <button 
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isAuthenticaed ? authLinks() : guestLinks()}
                    </ul>
                    </div>
                </div>
            </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticaed: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
