import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientListItem from "../ingredient-list-item";

import {withPizzaService} from '../hoc'
import { fetchIngredients, ingredientAddedToCart } from "../../actions";
import { compose } from "../../utils";
import './ingredient-list.css'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const IngredientList = ({ ingredients, onAddedToCart }) => {
	return (
		<ul className='ingredient-list'>
			{
				ingredients.map((ingredient) => {
					return (
						<li key={ingredient.id}>
							<IngredientListItem
								ingredient={ingredient}
								onAddedToCart={() => onAddedToCart(ingredient.id)}
							/>
						</li>
					)
				})
			}
		</ul>
	);
};

class IngredientListContainer extends Component {

	componentDidMount() {
		this.props.fetchIngredients();
	}

	render() {
		const {ingredients, loading, error, onAddedToCart} = this.props;

		if (loading) {
			return <Spinner/>
		}

		if (error) {
			return <ErrorIndicator/>
		}

		return <IngredientList ingredients={ingredients} onAddedToCart={onAddedToCart}/>
	}
}

const mapStateToProps = ({ ingredients, loading, error }) => {
	return { ingredients, loading, error }
};

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log('called mdtp');
	const { pizzaService } = ownProps;
	return {
		fetchIngredients: fetchIngredients(pizzaService, dispatch),
		onAddedToCart: (id) => dispatch(ingredientAddedToCart(id))
	}
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, mapDispatchToProps)
)(IngredientListContainer);