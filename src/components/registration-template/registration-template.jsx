import React from 'react';

import './registration-template.css'
import {compose} from "../../utils";
import {withPizzaService} from "../hoc";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'
import {fetchLogin, fetchRegistration} from "../../actions";

class RegistrationTemplate extends React.Component {

	state = {
		login: undefined,
		password: undefined
	};

	render() {
		const {temp, isLoggedIn} = this.props;
		if (isLoggedIn) {
			return (
				<Redirect to='/'/>
			)
		}
		return (
			<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin my-5">
						<div className="card-body">
							<h5 className="card-title text-center text-uppercase">{temp}</h5>
							<form className="form-signin">
								<div className="form-label-group">
									<input
										onChange={(e) => this.setState({login: e.target.value}) }
												 type="email"
												 id="inputEmail"
												 className="form-control "
												 placeholder="Email address"
												 required
												 autoFocus/>
									<label htmlFor="inputEmail">Email address</label>
								</div>

								<div className="form-label-group">
									<input onChange={(e) => this.setState({password: e.target.value}) }
												 type="password"
												 id="inputPassword"
												 className="form-control"
												 placeholder="Password"
												 required/>
									<label htmlFor="inputPassword">Password</label>
								</div>

								<button onClick={(e) => {
									e.preventDefault();
									if (this.state.login === undefined || this.state.password === undefined) {
										alert('Заполните данные')
									} else {
										if (temp === 'login') {
											this.props.fetchLogin(this.state.login,this.state.password)
										} else {
											this.props.fetchRegistration(this.state.login,this.state.password);
										}
									}
								}
								} className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">{temp}</button>
								<hr className="my-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>	)
	}
}

const mapStateToProps = ({ isLoggedIn, loginName }) => {
	return { isLoggedIn, loginName }
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, {fetchLogin, fetchRegistration})
)(RegistrationTemplate);
