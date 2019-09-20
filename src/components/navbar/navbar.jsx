import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  checkAuthenticationFromLocalStorage,
  logOut,
} from '../../actions';

const RegLogBar = () => (
  <>
    <li className="nav-item">
      <Link to="/registration">
        <p className="nav-link badge badge-light">Registration</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/login">
        <p className="nav-link badge badge-light">Log In</p>
      </Link>
    </li>
  </>
);

const LogOutBar = ({ logOut }) => (
  <li onClick={() => logOut()} className="nav-item">
    <Link to="/login">
      <p className="nav-link badge badge-secondary">Log Out</p>
    </Link>
  </li>
);

class Navbar extends React.Component {
  componentDidMount() {
    const { checkAuthenticationFromLocalStorage } = this.props;
    checkAuthenticationFromLocalStorage();
  }

  render() {
    const { isLoggedIn, loginName, logOut } = this.props;

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <p className="navbar-brand ">Seven pizza</p>
          </Link>
          <h3>
            <span className="badge badge-secondary">
Hi_
              {loginName}
            </span>
          </h3>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/">
                  <p className="nav-link badge badge-light">Menu</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/history">
                  <p className="nav-link badge badge-light">History</p>
                </Link>
              </li>
              {isLoggedIn ? <LogOutBar logOut={logOut} /> : <RegLogBar />}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  checkAuthenticationFromLocalStorage: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loginName: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
};


const mapStateToProps = ({ loginName, isLoggedIn }) => ({ loginName, isLoggedIn });

const mapDispatchToProps = {
  logOut,
  checkAuthenticationFromLocalStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
