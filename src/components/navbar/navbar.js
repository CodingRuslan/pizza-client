import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import {connect} from "react-redux";


const RegLogBar = () => {
	return (
		<>
			<li className="nav-item">
				<Link to='/registration'>
					<p className="nav-link">Registration</p>
				</Link>
			</li>
			<li className="nav-item">
				<Link to='/login'>
					<p className="nav-link">Log In</p>
				</Link>
			</li>
		</>
	)
};

const LogOutBar = () => {
	return (
		<li className="nav-item">
			<Link to='/logout'>
				<p className="nav-link">Log Out</p>
			</Link>
		</li>
	)
};

const Navbar = ({isLoggedIn}) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container">
				<Link to='/'>
					<p className="navbar-brand">Seven pizza</p>
				</Link>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link to='/'>
								<p className="nav-link">Menu</p>
							</Link>
						</li>
						<li className="nav-item">
							<Link to='/history'>
								<p className="nav-link">History</p>
							</Link>
						</li>
						{isLoggedIn ? <LogOutBar/> : <RegLogBar/>}
					</ul>
				</div>
			</div>
		</nav>
	)
};

const mapStateToProps = ({ isLoggedIn }) => {
	return { isLoggedIn }
};

export default connect(mapStateToProps)(Navbar);