
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

const fetchIngredients = (pizzaService, dispatch) => () => {
	dispatch(ingredientsRequested());
	pizzaService.getIngredients()
		.then(e => dispatch(ingredientsLoaded(e)))
		.catch((err) => dispatch(ingredientsError(err)));
};

export {
	fetchIngredients
}