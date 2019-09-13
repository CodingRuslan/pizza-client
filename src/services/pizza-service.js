const axios = require('axios');

const _apiBase = 'http://localhost:8080';
export default class PizzaService {

	logIn = async (login, pass) => {
			let curr = "";
			const res = await axios.post(`${_apiBase}/login/`, {
				"login": login + curr,
				"password": pass + curr
			})
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					console.log(error);
				});
			console.log(res);
			return res
	};

	registration = async (login, pass) => {
		let curr = "";
		const res = await axios.post(`${_apiBase}/registration/`, {
			"login": login + curr,
			"password": pass + curr
		})
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				console.log(error);
			});
		console.log(res);
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

	_transformIngredients= (ingredient) => {
		return {
			id: ingredient.idingredients,
			name: ingredient.name,
			timeCook: ingredient.timeCook,
			imageSrc: ingredient.imageSrc
		}
	}
}