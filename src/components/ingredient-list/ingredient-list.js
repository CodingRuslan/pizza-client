import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientListItem from "../ingredient-list-item";

import {withPizzaService} from '../hoc'
import { ingredientsLoaded} from "../../actions";
import { compose } from "../../utils";
import './ingredient-list.css'

class IngredientList extends Component {

	componentDidMount() {
		const {pizzaService} = this.props;
		const data = pizzaService.getIngredients()
			.then(e => this.props.ingredientsLoaded(e));
		console.log(data);

		// this.props.ingredientsLoaded(data);
	}

	render() {
		const {ingredients} = this.props;
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

const mapStateToProps = ({ ingredients }) => {
	return { ingredients }
};

const mapDispatchToProps = {
	ingredientsLoaded
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, mapDispatchToProps)
)(IngredientList);