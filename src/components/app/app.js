import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomePage, HistoryPage, LoginPage, RegistrationPage, HistoryOrderDetails,
} from '../pages';
import './app.css';
import Navbar from '../navbar';


const App = ({ isLoggedIn }) => (
  <main role="main" className="container">
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

const mapStateToProps = ({ isLoggedIn }) => ({ isLoggedIn });

export default connect(mapStateToProps)(App);
