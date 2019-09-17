import PizzaService from '../services/pizza-service';
const pizzaService = new PizzaService();

const registrationUser = (data) => {
	return {
		type: "POST_USER_CREATE",
		payload: data
	}
};

export const checkAuthenticationFromLocalStorage = () => {
		return {
			type: 'CHECK_AUTHENTICATION_FROM_LOCAL_STORAGE',
	}
};

const correctLogin = (...args) => {
	return {
		type: 'POST_LOGIN_SUCCESS',
		payload: args
	};
};

const wrongLogin = () => {
	return {
		type: 'POST_LOGIN_WRONG',
		payload: 'Неправильный логин или пароль'
	};
};

export const logOut = () => {
	return {
		type: 'FETCH_LOG_OUT',
	};
};

const loginError = (error) => {
	return {
		type: "POST_LOGIN_FAILURE",
		payload: error
	}
};

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

const historyItemsRequested = () => {
	return {
		type: 'FETCH_HISTORY_ITEMS_REQUEST'
	}
};

const historyItemsLoaded = (newHistoryItems) => {
	return {
		type: 'FETCH_HISTORY_ITEMS_SUCCESS',
		payload: newHistoryItems
	};
};

const historyItemsError = (error) => {
	return {
		type: "FETCH_HISTORY_ITEMS_FAILURE",
		payload: error
	}
};

const orderPlaced = () => {
	return {
		type: 'MAKE_NEW_ORDER_REQUEST'
	}
};

const orderIsReady = (newOrder) => {
	return {
		type: 'MAKE_NEW_ORDER_SUCCESS',
		payload: newOrder
	};
};

const orderError = (error) => {
	return {
		type: "MAKE_NEW_ORDER_FAILURE",
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

const fetchIngredients = () => (dispatch) => {
	dispatch(ingredientsRequested());
	pizzaService.getIngredients()
		.then(e => dispatch(ingredientsLoaded(e)))
		.catch((err) => dispatch(ingredientsError(err)));
};

const fetchHistoryItems = (userId) => (dispatch) => {
	dispatch(historyItemsRequested());
	pizzaService.getHistoryItems(userId)
		.then(e => dispatch(historyItemsLoaded(e)))
		.catch((err) => dispatch(historyItemsError(err)));
};

const fetchLogin = (login, pass) => (dispatch) => {
	pizzaService.logIn(login, pass)
		.then(e => {
			if (e.data.login.length > 0){
				dispatch(correctLogin(e.data.login, e.data.idusers))
			} else {
				dispatch(wrongLogin());
			}
		})
		.catch((err) => dispatch(loginError(err)));
};

const fetchRegistration = (login, pass) => (dispatch) => {
	pizzaService.registration(login, pass)
		.then(e => {
			dispatch(registrationUser(e.data))
		})
		.catch((err) => dispatch(loginError(err)));
};

const fetchMakeOrder = (userId, cartItems) => (dispatch) => {
	pizzaService.makeOrder(userId, cartItems)
		.then(e => {
			dispatch(orderIsReady(e.data))
		})
		.catch((err) => dispatch(orderError(err)));
	dispatch(orderPlaced());
};

export {
	fetchIngredients,
	fetchHistoryItems,
	fetchLogin,
	fetchRegistration,
	fetchMakeOrder
}