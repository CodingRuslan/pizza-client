import React from 'react';
import IngredientList from '../ingredient-list';
import ShoppingCartTable from '../shopping-cart-table';
import PizzaHeader from '../pizza-header';

const HomePage = () => (
  <div>
    <PizzaHeader />
    <IngredientList />
    <ShoppingCartTable />
  </div>
);

export default HomePage;
