import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, HistoryPage, LoginPage, RegistrationPage} from '../pages'
import './app.css'
import Navbar from "../navbar";
import {connect} from "react-redux";

const App = ({isLoggedIn}) => {
	return (
		<main role='main' className='container'>
			<Navbar/>

			<Switch>
				<Route exact path="/" render={() => (
					isLoggedIn ? (
						<Route
							path='/'
							component={HomePage}
							exact
						/>
					) : (
						<Redirect to="/login"/>
					)
				)}/>

				<Route path="/history" render={() => (
					isLoggedIn ? (
						<Route
							path='/history'
							component={HistoryPage}
						/>
					) : (
						<Redirect to="/login"/>
					)
				)}/>

				<Route
					path='/registration'
					component={RegistrationPage}
				/>

				<Route
					path='/login'
					component={LoginPage}
				/>


			</Switch>
		</main>
	)
};

const mapStateToProps = ({ isLoggedIn }) => {
	return { isLoggedIn }
};

export default connect(mapStateToProps)(App);