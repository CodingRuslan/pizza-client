import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HomePage, HistoryPage, LoginPage, RegistrationPage, HistoryOrderDetails,
} from '../pages';
import './app.css';
import Navbar from '../navbar';
import ModalWindow from '../modal-window';


const App = ({ isLoggedIn, messageForModalWindow }) => (
  <main role="main" className="container">
    { messageForModalWindow.length > 0 ? <ModalWindow /> : ''}
    <Navbar />

    <Switch>
      <Route
        exact
        path="/"
        render={() => (isLoggedIn ? (
          <Route
            path="/"
            component={HomePage}
            exact
          />
        ) : (
          <Redirect to="/login" />)
        )}
      />

      <Route
        exact
        path="/history"
        render={() => (isLoggedIn ? (
          <Route
            path="/history"
            component={HistoryPage}
          />
        ) : (
          <Redirect to="/login" />)
        )}
      />

      <Route
        path="/history/:orderId"
        render={() => (isLoggedIn ? (
          <Route
            path="/history/:orderId"
            component={HistoryOrderDetails}
          />
        ) : (
          <Redirect to="/login" />)
        )}
      />

      <Route
        path="/registration"
        component={RegistrationPage}
      />

      <Route
        path="/login"
        component={LoginPage}
      />


    </Switch>
  </main>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  messageForModalWindow: PropTypes.string.isRequired,
};

const mapStateToProps = ({ isLoggedIn, messageForModalWindow }) => (
  { isLoggedIn, messageForModalWindow });

export default connect(mapStateToProps)(App);
