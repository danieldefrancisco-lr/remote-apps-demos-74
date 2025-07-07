import React from 'react';
import ReactDOM from 'react-dom';
import MMRApiClient from './components/MMRApiClient';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		const apikey=this.getAttribute("apiKey");
		const serverUrl=this.getAttribute("serverUrl");
		ReactDOM.render(
			<MMRApiClient apikey={apikey} />,
			this
		);
	}
}
const ELEMENT_ID = 'mmr-input-form';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}