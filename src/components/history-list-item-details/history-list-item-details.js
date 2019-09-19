import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from '../../utils/compose';
import { fetchHistoryDetailsItems } from '../../actions';
import IngredientListItem from '../ingredient-list-item';

class HistoryItemDetails extends React.Component {
  componentDidMount(props = this.props) {
    const { match } = props;
    const { orderId } = match.params;
    props.fetchHistoryDetailsItems(orderId);
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

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchHistoryDetailsItems }),
)(HistoryItemDetails);
