
const registrationUser = (data) => {
	return {
		type: "POST_USER_CREATE",
		payload: data
	}
};

const correctLogin = (login) => {
	return {
		type: 'POST_LOGIN_SUCCESS',
		payload: login
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

const fetchLogin = (pizzaService, dispatch) => (login, pass) => {
	pizzaService.logIn(login, pass)
		.then(e => {
			if (e.data.length > 0){
				dispatch(correctLogin(e.data))
			} else {
				dispatch(wrongLogin());
			}
		})
		.catch((err) => dispatch(loginError(err)));
};

const fetchRegistration = (pizzaService, dispatch) => (login, pass) => {
	pizzaService.registration(login, pass)
		.then(e => {
			dispatch(registrationUser(e.data))
		})
		.catch((err) => dispatch(loginError(err)));
};

export {
	fetchIngredients,
	fetchLogin,
	fetchRegistration
}