
 const initialState = {
	 ingredients: [],
	 loading: true,
	 error: null
 };

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case "FETCH_INGREDIENTS_REQUEST":
			return {
				ingredients: [],
				loading: true,
				error: null
			};
		case "FETCH_INGREDIENTS_SUCCESS":
			return {
				ingredients: action.payload,
				loading: false,
				error: null
			};
		case "FETCH_INGREDIENTS_FAILURE":
			return {
				ingredients: [],
				loading: false,
				error: action.payload
			};

		default:
			return state;
	}
};

export default reducer;