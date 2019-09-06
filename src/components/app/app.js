import React from 'react';
import './app.css'
import { withPizzaService } from '../hoc'

const App = ({pizzaService}) => {
	console.log(pizzaService.getIngredients());
	return (
		<h1>App</h1>
	)
};

export default withPizzaService()(App);