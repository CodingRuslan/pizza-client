

export default class PizzaService {
	_apiBase = 'http://localhost:8080';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error('Could not fetch')
		}
		return await res.json();
	};

	getIngredients = async () => {
		const res = await this.getResource('/ingredients/');
		// console.log(res.map(this._transformIngredients));
		return await res.map(this._transformIngredients);
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