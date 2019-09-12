const axios = require('axios');

const _apiBase = 'http://localhost:8080';
export default class PizzaService {

	// getResource = async (url) => {
	// 	const res = await fetch(`${this._apiBase}${url}`);
	//
	// 	if (!res.ok) {
	// 		throw new Error('Could not fetch')
	// 	}
	// 	return await res.json();
	// };
	//
	// getIngredients = async () => {
	// 	const res = await this.getResource('/ingredients/');
	// 	return await res.map(this._transformIngredients);
	// };

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