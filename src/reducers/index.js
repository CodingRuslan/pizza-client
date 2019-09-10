
 const initialState = {
	 ingredients: [],
	 loading: true,
	 error: null,
	 cartItems: [],
	 orderTotal: 45
 };

const updateCartItems = (cartItems, item, idx) => {

	if (item.count === 0) {
		return [
			...cartItems.slice(0, idx),
			...cartItems.slice(idx + 1)
		]
	}

	if (idx === -1) {
		return [
			...cartItems,
			item
		];
	}

	return [
		...cartItems.slice(0, idx),
		item,
		...cartItems.slice(idx + 1)
	];
};

const updateCartItem = (ingredient, item, quantity) => {

	if (item) {
		return  {
			...item,
			count: item.count + quantity,
			time: item.time + quantity * ingredient.timeCook
		};
	} else {
		return {
			id: ingredient.id,
			name: ingredient.name,
			count: 1,
			time: ingredient.timeCook
		};
	}
};

const updateOrder = (state, ingredientId, quantity) => {
	const { ingredients, cartItems} = state;
	const ingredient = ingredients.find((ingredient) => ingredient.id === ingredientId);

	const itemIndex = cartItems.findIndex((ingredient) => ingredient.id === ingredientId);
	const item = cartItems[itemIndex];
	const newItem = updateCartItem(ingredient, item, quantity);

	return {
		...state,
		cartItems: updateCartItems(cartItems, newItem, itemIndex)
	};
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case "FETCH_INGREDIENTS_REQUEST":
			return {
				...state,
				ingredients: [],
				loading: true,
				error: null
			};

		case "FETCH_INGREDIENTS_SUCCESS":
			return {
				...state,
				ingredients: action.payload,
				loading: false,
				error: null
			};

		case "FETCH_INGREDIENTS_FAILURE":
			return {
				...state,
				ingredients: [],
				loading: false,
				error: action.payload
			};

		case 'INGREDIENT_ADDED_TO_CART':
			return updateOrder(state, action.payload, 1);

		case 'INGREDIENT_REMOVED_FROM_CART':
			return updateOrder(state, action.payload, -1);

		case 'ALL_INGREDIENTS_REMOVED_FROM_CART':
			const item = state.cartItems.find(({id}) => id === action.payload);
			return updateOrder(state, action.payload, -item.count);

		default:
			return state;
	}
};

export default reducer;