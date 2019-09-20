import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import compose from '../../utils/compose';
import { fetchHistoryDetailsItems } from '../../actions';
import IngredientListItem from '../ingredient-list-item';
import './history-list-item-details.css';

class HistoryItemDetails extends React.Component {
  componentDidMount() {
    const { match, fetchHistoryDetailsItems } = this.props;
    const { orderId } = match.params;
    fetchHistoryDetailsItems(orderId);
  }

  render() {
    const { historyDetailsItems, ingredients, match } = this.props;
    const { orderId } = match.params;
    return (
      <>
        <h2>
Order number:
          {orderId}
        </h2>
        <ul className="ingredient-list">
          {
            ingredients.map((ingredient) => {
              if (historyDetailsItems.indexOf(ingredient.id) !== -1) {
                return (
                  <li key={ingredient.id}>
                    <IngredientListItem
                      ingredient={ingredient}
                      onAddedToCart={() => console.log('abra cadabra')}
                    />
                  </li>
                );
              }
            })
          }
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({
  historyDetailsItems, ingredients,
}) => ({
  historyDetailsItems, ingredients,
});

HistoryItemDetails.propTypes = {
  fetchHistoryDetailsItems: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  historyDetailsItems: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchHistoryDetailsItems }),
)(HistoryItemDetails);
