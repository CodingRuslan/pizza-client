import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientListItem from "../ingredient-list-item";

import './ingredient.css'

class IngredientList extends Component {

	render() {
		const {ingredients} = this.props;
		return (
			<ul>
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

export default connect(mapStateToProps,)(IngredientList)