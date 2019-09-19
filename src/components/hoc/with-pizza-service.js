import React from 'react';
import { PizzaServiceConsumer } from '../pizza-service-context';

const withPizzaService = () => (Wrapped) => (props) => (
  <PizzaServiceConsumer>
    {
(pizzaService) => (
  <Wrapped
    {...props}
    pizzaService={pizzaService}
  />
)
}
  </PizzaServiceConsumer>
);

export default withPizzaService;
