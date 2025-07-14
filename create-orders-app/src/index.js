import React from 'react';
import ReactDOM from 'react-dom';
import AppClay from './components/AppClay';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		const channelId=this.getAttribute("channelId");
		ReactDOM.render(
			<AppClay channelId={channelId}/>,
			this
		);
	}
}
const ELEMENT_ID = 'create-orders-app';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}