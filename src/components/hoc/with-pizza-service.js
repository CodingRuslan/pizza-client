import React from 'react';
import{ PizzaServiceConsumer } from "../pizza-service-context";

const withPizzaService = () => (Wrapped) => {

	return (props) => {
		return (
			<PizzaServiceConsumer>
				{
					(pizzaService) => {
						return (<Wrapped {...props}
									 pizzaService={pizzaService}
						/>)
					}
				}
			</PizzaServiceConsumer>
		)
	}
};

export default withPizzaService;