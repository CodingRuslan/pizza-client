import React from 'react';
import './shopping-cart-table.css';
import {connect} from "react-redux";

import {
	ingredientAddedToCart,
	ingredientRemoveFromCart,
	allIngredientRemoveFromCart,
	fetchMakeOrder,
} from "../../actions";
import {compose} from "../../utils";
import {withPizzaService} from "../hoc";

const ShoppingCartTable = ({ items, total, userId, onIncrease, onDecrease, onDelete, fetchMakeOrder}) => {
	const renderRow = (item, idx) => {
		const {id, name, count, time} = item;
		return (
			<tr key={id}>
				<td>{idx + 1}</td>
				<td>{name}</td>
				<td>{count}</td>
				<td>{time} sec</td>
				<td>
					<button
						onClick={() => onDelete(id)}
						className="btn btn-outline-danger btn-sm float-right">
						<i className="fa fa-trash-o" />
					</button>
					<button
						onClick={() => { onIncrease(id)}}
						className="btn btn-outline-success btn-sm float-right">
						<i className="fa fa-plus-circle" />
					</button>
					<button
						onClick={() => onDecrease(id)}
						className="btn btn-outline-warning btn-sm float-right">
						<i className="fa fa-minus-circle" />
					</button>
				</td>
			</tr>
		)
	};

	return (
		<div className="shopping-cart-table">
			<h2>Your Order</h2>
			<table className="table">
				<thead>
				<tr>
					<th>#</th>
					<th>Item</th>
					<th>Count</th>
					<th>Time</th>
					<th>Action</th>
				</tr>
				</thead>

				<tbody>
				{items.map(renderRow)}
				</tbody>
			</table>

			<div className="total">
				<button type="button" onClick={() => fetchMakeOrder(userId, items)} className="btn btn-success">Make an order.</button>
				Total: {total} sec
			</div>
		</div>
	);
};

const mapStateToProps = ({ cartItems, orderTotal, userId }) => {
	return {
		items: cartItems,
		total: orderTotal,
		userId: userId
	}
};

// const mapDispatchToProps = {
// 	onIncrease: ingredientAddedToCart,
// 	onDecrease: ingredientRemoveFromCart,
// 	onDelete: allIngredientRemoveFromCart,
// 	fetchMakeOrder
// };

const mapDispatchToProps = (dispatch, ownProps) => {
	const { pizzaService } = ownProps;
	return {
		onIncrease: ingredientAddedToCart,
		onDecrease: ingredientRemoveFromCart,
		onDelete: allIngredientRemoveFromCart,
		fetchMakeOrder: fetchMakeOrder(pizzaService, dispatch),
	}
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, mapDispatchToProps)
)(ShoppingCartTable);