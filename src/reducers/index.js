
 const initialState = {
		ingredients: []
 };

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case "INGREDIENTS_LOADED":
			return {
				ingredients: action.payload
			};

		default:
			return state;
	}
};

export default reducer;