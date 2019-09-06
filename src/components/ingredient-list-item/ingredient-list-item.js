import React, { Fragment } from 'react';
import './ingredient-list-item.css'

const IngredientListItem = ({ ingredient }) => {
	const {name, timeCook } = ingredient;
	return(
		<Fragment>
			<span>{name}</span>
			<span>{timeCook}</span>
		</Fragment>
	)
};

export default IngredientListItem;