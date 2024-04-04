import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		ReactDOM.render(
			<App />,
			this
		);
	}
}
const ELEMENT_ID = 'booking-engine-remote-app';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}