import React from 'react';
import ReactDOM from 'react-dom';
import ShipmentsStatus from './routes/shipments-status/pages/ShipmentsStatus';
import ShipmentsAmount from './routes/orders-amount/pages/OrdersAmount';
import OrdersAndAmount from './routes/number-of-orders-and-amount/pages/OrdersAndAmount';
import './common/styles/index.scss';
const App = ({ route }) => {
	if (route === "shipments-status") {
		return <ShipmentsStatus />;
	}
	if (route === "shipments-amount") {
		return <ShipmentsAmount />;
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
const ELEMENT_ID = 'shipment-graph-remote-app';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}