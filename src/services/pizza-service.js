

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
		// console.log(res);
		return res._transformPerson();
	};

	// _extractId = (item) => {
	// 	const idRegExp = /\/([0-9]*)\/$/;
	// 	return item.url.match(idRegExp)[1];
	// };

	_transformPerson = (person) => {
		return {
			id: person.idingredients,
			name: person.name,
			timeCook: person.timeCook,
		}
	}

	// getIngredients() {
	// 	return [];
	// }
}