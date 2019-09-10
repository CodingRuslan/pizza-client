import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientListItem from "../ingredient-list-item";

import {withPizzaService} from '../hoc'
import { fetchIngredients } from "../../actions";
import { compose } from "../../utils";
import './ingredient-list.css'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class IngredientList extends Component {

	componentDidMount() {
		this.props.fetchIngredients();
	}

	render() {
		const {ingredients, loading, error} = this.props;

		if (loading) {
			return <Spinner/>
		}

		if (error) {
			return <ErrorIndicator/>
		}

		return (
			<ul className='ingredient-list'>
				{
					ingredients.map((ingredient) => {
						return (
							<li key={ingredient.id}><IngredientListItem ingredient={ingredient}/></li>
						)
					})
				}
			</ul>
		);
	}
}

const mapStateToProps = ({ ingredients, loading, error }) => {
	return { ingredients, loading, error }
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { pizzaService } = ownProps;
	return {
		fetchIngredients: fetchIngredients(pizzaService, dispatch)
	}
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, mapDispatchToProps)
)(IngredientList);