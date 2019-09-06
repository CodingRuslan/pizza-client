
const ingredientsLoaded = (newIngredients) => {
	return {
		type: 'INGREDIENTS_LOADED',
		payload: newIngredients
	};
};

export {
	ingredientsLoaded
}