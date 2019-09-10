
const ingredientsRequested = () => {
	return {
		type: 'FETCH_INGREDIENTS_REQUEST'
	}
};

const ingredientsLoaded = (newIngredients) => {
	return {
		type: 'FETCH_INGREDIENTS_SUCCESS',
		payload: newIngredients
	};
};

const ingredientsError = (error) => {
	return {
		type: "FETCH_INGREDIENTS_FAILURE",
		payload: error
	}
};

export const ingredientAddedToCart = (ingredientId) => {
	return {
		type: 'INGREDIENT_ADDED_TO_CART',
		payload: ingredientId
	}
};

export const ingredientRemoveFromCart = (ingredientId) => {
	return {
		type: 'INGREDIENT_REMOVED_FROM_CART',
		payload: ingredientId
	}
};

export const allIngredientRemoveFromCart = (ingredientId) => {
	return {
		type: 'ALL_INGREDIENTS_REMOVED_FROM_CART',
		payload: ingredientId
	}
};

const fetchIngredients = (pizzaService, dispatch) => () => {
	dispatch(ingredientsRequested());
	pizzaService.getIngredients()
		.then(e => dispatch(ingredientsLoaded(e)))
		.catch((err) => dispatch(ingredientsError(err)));
};

export {
	fetchIngredients
}