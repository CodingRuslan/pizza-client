import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";

import App from './components/app';
import ErrorBoundry from "./components/error-boundry";
import PizzaService from "./services/pizza-service";
import { PizzaServiceProvider} from "./components/pizza-service-context/pizza-service-context";

import store from "./store";

const pizzaService = new PizzaService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<PizzaServiceProvider value={pizzaService}>
				<Router>
					<App/>
				</Router>
			</PizzaServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
);