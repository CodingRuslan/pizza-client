import React from 'react';
import IngredientList from "../ingredient-list";
import ShoppingCartTable from "../shopping-cart-table";

const HomePage = () => {
	return (
		<div>
			<IngredientList />
			<ShoppingCartTable/>
		</div>
	);
};

export default HomePage;