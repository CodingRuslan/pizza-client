import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientListItem from '../ingredient-list-item';

import { withPizzaService } from '../hoc';
import { fetchIngredients, ingredientAddedToCart } from '../../actions';
import { compose } from '../../utils';
import './ingredient-list.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const IngredientList = ({ ingredients, onAddedToCart }) => (
  <ul className="ingredient-list">
    {
ingredients.map((ingredient) => (
  <li key={ingredient.id}>
    <IngredientListItem
      ingredient={ingredient}
      onAddedToCart={() => onAddedToCart(ingredient.id)}
    />
  </li>
))
    }
  </ul>
);

class IngredientListContainer extends Component {
  componentDidMount() {
    this.props.fetchIngredients();
  }

  render() {
    const {
      ingredients, loading, error, ingredientAddedToCart,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <IngredientList ingredients={ingredients} onAddedToCart={ingredientAddedToCart} />;
  }
}

const mapStateToProps = ({ ingredients, loading, error }) => ({ ingredients, loading, error });

export default compose(
  withPizzaService(),
  connect(mapStateToProps, { fetchIngredients, ingredientAddedToCart }),
)(IngredientListContainer);
