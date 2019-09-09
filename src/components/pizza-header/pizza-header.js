import React from 'react';
import './pizza-header.css';

const PizzaHeader = ({ numItems, total }) => {
	return (
		<header className="pizza-header row">
			<a className="logo text-dark" href="#">RE:Pizza</a>
			<a className="shopping-cart">
				<i className="cart-icon fa fa-shopping-cart" />
				{numItems} items ({total}sec)
			</a>
		</header>
	);
};

export default PizzaHeader;