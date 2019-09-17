import React, {Component} from 'react';
import {connect} from "react-redux";

import './history-list.css'
import {fetchHistoryItems} from "../../actions";
import {compose} from "../../utils";
import {withPizzaService} from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class HistoryList extends Component{

	componentDidMount() {
		const {userId} = this.props;

		this.props.fetchHistoryItems(userId);
	}

	render() {
		const {historyItems, loading, error} = this.props;

		if (loading) {
			return <Spinner/>
		}

		if (error) {
			return <ErrorIndicator/>
		}

		return (
			<div className="container">

				<h1 className="my-4">Your history</h1>
				<div className="row">
				{historyItems.map(({idclientOrder, timeCooking, orderDone}) => {
					return (

							<div key={idclientOrder} className="col-lg-3 col-md-4 col-sm-6 mb-4">
								<div className="card h-100">
									<div className="card-body">
										<h4 className="card-title">
											<a href="#">Order number: {idclientOrder}</a>
										</h4>
										<p className="card-text">Time for preparing: {timeCooking} sec</p>
										<p className="card-text">Order status: {orderDone ? <span className="badge badge-success">Ready</span> :
											<span className="badge badge-warning">In processing</span>}</p>
									</div>
								</div>
							</div>

					)
				})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ historyItems, userId, loading, error }) => {
	return { historyItems, userId, loading, error }
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { pizzaService } = ownProps;
	return {
		fetchHistoryItems: fetchHistoryItems(pizzaService, dispatch),
	}
};

export default compose(
	withPizzaService(),
	connect(mapStateToProps, mapDispatchToProps)
)(HistoryList);