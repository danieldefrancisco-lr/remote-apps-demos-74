import React from 'react';
import ReactDOM from 'react-dom';
import OrdersStatus from './routes/orders-status/pages/OrdersStatus';
import OrdersStatusCustomer from './routes/orders-status/pages/OrdersStatusCustomer';
import OrdersAmount from './routes/orders-amount/pages/OrdersAmount';
import OrdersAndAmount from './routes/number-of-orders-and-amount/pages/OrdersAndAmount';
import OrdersAndAmountCustomer from './routes/number-of-orders-and-amount/pages/OrdersAndAmountCustomer';
import './common/styles/index.scss';
const App = ({ route }) => {
	if (route === "orders-status") {
		return <OrdersStatus />;
	}
	if (route === "orders-status-customer") {
		return <OrdersStatusCustomer />;
	}
	if (route === "orders-amount") {
		return <OrdersAmount />;
	}
	if (route === "orders-and-amount-customer") {
		return <OrdersAndAmountCustomer />;
	}
	return <OrdersAndAmount />;
};
class WebComponent extends HTMLElement {
	connectedCallback() {
		ReactDOM.render(
			<App route={this.getAttribute("route")} />,
			this
		);
	}
}
const ELEMENT_ID = 'order-graph-remote-app';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}