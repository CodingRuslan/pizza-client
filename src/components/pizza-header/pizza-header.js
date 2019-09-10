import React from 'react';
import { Link} from "react-router-dom";
import './pizza-header.css';

const PizzaHeader = ({ numItems, total }) => {
	return (
		<header className="pizza-header row">
			<Link to='/'>
				<div className="logo text-dark" href="#"><i className="fa fa-empire" />GR:pizza</div>
			</Link>
			<Link to="/cart">
				<div className="shopping-cart">
					<i className="cart-icon fa fa-shopping-cart" />
					{numItems} items ({total}sec)
				</div>
		</Link>
		</header>
	);
};

export default PizzaHeader;