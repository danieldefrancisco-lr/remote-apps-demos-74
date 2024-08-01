import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppClay from './components/AppClay';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		const catalogId=this.getAttribute("catalogId");
		const manufacturerCategoryId=this.getAttribute("manufacturerCategoryId");
		const channelId=this.getAttribute("channelId");
		ReactDOM.render(
			<AppClay catalogId={catalogId} manufacturerCategoryId={manufacturerCategoryId} channelId={channelId}/>,
			this
		);
	}
}
const ELEMENT_ID = 'create-orders-form';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}