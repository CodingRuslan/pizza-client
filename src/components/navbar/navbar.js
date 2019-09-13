import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import {connect} from "react-redux";

import {
	logOut
} from "../../actions";


const RegLogBar = () => {
	return (
		<>
			<li className="nav-item">
				<Link to='/registration'>
					<p className="nav-link badge badge-light">Registration</p>
				</Link>
			</li>
			<li className="nav-item">
				<Link to='/login'>
					<p className="nav-link badge badge-light">Log In</p>
				</Link>
			</li>
		</>
	)
};

const LogOutBar = ({logOut} ) => {
	return (
		<li onClick={() => logOut()} className="nav-item">
			<Link to='/login'>
				<p className="nav-link badge badge-secondary">Log Out</p>
			</Link>
		</li>
	)
};

const Navbar = ({isLoggedIn, loginName, logOut}) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container">
				<Link to='/'>
					<p className="navbar-brand ">Seven pizza</p>
				</Link>
				<h3><span className="badge badge-secondary">Hi {loginName}</span></h3>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link to='/'>
								<p className="nav-link badge badge-light">Menu</p>
							</Link>
						</li>
						<li className="nav-item">
							<Link to='/history'>
								<p className="nav-link badge badge-light">History</p>
							</Link>
						</li>
						{isLoggedIn ? <LogOutBar logOut={logOut}/> : <RegLogBar/>}
					</ul>
				</div>
			</div>
		</nav>
	)
};

const mapStateToProps = ({ loginName, isLoggedIn }) => {
	return { loginName, isLoggedIn }
};

const mapDispatchToProps = {
	logOut: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
