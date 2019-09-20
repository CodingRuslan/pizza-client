import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './history-list.css';
import { fetchHistoryItems } from '../../actions';
import { compose } from '../../utils';
import { withPizzaService } from '../hoc';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class HistoryList extends Component {
  componentDidMount() {
    const { userId, fetchHistoryItems } = this.props;

    fetchHistoryItems(userId);
  }

  render() {
    const { historyItems, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <div className="container">

        <h1 className="my-4">Your history</h1>
        <div className="row">
          {historyItems.map(({ idclientOrder, timeCooking, orderDone }) => (

            <div key={idclientOrder} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to={`/history/${idclientOrder}`}>
Order number:
                      {' '}
                      {idclientOrder}
                    </Link>
                  </h4>
                  <p className="card-text">
Time for preparing:
                    {timeCooking}
                    {' '}
sec
                  </p>
                  <p className="card-text">
Order status:
                    {orderDone ? <span className="badge badge-success">Ready</span>
                      : <span className="badge badge-warning">In processing</span>}
                  </p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

HistoryList.propTypes = {
  userId: PropTypes.string.isRequired,
  fetchHistoryItems: PropTypes.func.isRequired,
  historyItems: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = ({
  historyItems, userId, loading, error,
}) => ({
  historyItems, userId, loading, error,
});

export default compose(
  withPizzaService(),
  connect(mapStateToProps, { fetchHistoryItems }),
)(HistoryList);
