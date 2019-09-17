const axios = require('axios');

const _apiBase = 'http://localhost:8080';
export default class PizzaService {

	logIn = async (login, pass) => {
			const res = await axios.post(`${_apiBase}/login/`, {
				"login": login,
				"password": pass
			})
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					console.log(error);
				});
			return res
	};

	registration = async (login, pass) => {
		const res = await axios.post(`${_apiBase}/registration/`, {
			"login": login,
			"password": pass
		})
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				console.log(error);
			});
		return res
	};

	makeOrder = async (userId, cartItems) => {
		const transformCartItems = cartItems.map((e) => {
			return e.id
		});
		const res = await axios.post(`${_apiBase}/neworder/`, {
			"userId": userId,
			"cartItems": transformCartItems
		})
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				console.log(error);
			});
		return res
	};

	getIngredients = async () => {
		try {
			const response = await axios.get(`${_apiBase}/ingredients/`);
			return response.data.map(this._transformIngredients);
		} catch (error) {
			console.error(error);
		}
	};

	getHistoryItems = async (userId) => {
		try {
			const response = await axios.get(`${_apiBase}/orders/${userId}/`);
			return response.data
		} catch (error) {
			console.error(error);
		}
	};

	_transformIngredients= (ingredient) => {
		return {
			id: ingredient.idingredients,
			name: ingredient.name,
			timeCook: ingredient.timeCook,
			imageSrc: ingredient.imageSrc
		}
	}
}