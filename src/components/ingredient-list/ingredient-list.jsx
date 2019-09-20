import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IngredientListItem from '../ingredient-list-item';

import { withPizzaService } from '../hoc';
import { fetchIngredients, ingredientAddedToCart } from '../../actions';
import { compose } from '../../utils';
import './ingredient-list.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ModalWindow from '../modal-window/';

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
    const { fetchIngredients } = this.props;
    fetchIngredients();
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

    return (
      <div>
        <IngredientList ingredients={ingredients} onAddedToCart={ingredientAddedToCart} />
      </div>
    );
  }
}

IngredientListContainer.propTypes = {
  fetchIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  ingredientAddedToCart: PropTypes.func.isRequired,
};

IngredientList.propTypes = {
  onAddedToCart: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
};

const mapStateToProps = ({ ingredients, loading, error }) => ({ ingredients, loading, error });

export default compose(
  withPizzaService(),
  connect(mapStateToProps, { fetchIngredients, ingredientAddedToCart }),
)(IngredientListContainer);
