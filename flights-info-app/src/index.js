import React from 'react';
import ReactDOM from 'react-dom';
import AppAena from './components/AppAena';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		const airport=this.getAttribute("airport");
		ReactDOM.render(
			<AppAena airport={airport}/>,
			this
		);
	}
}
const ELEMENT_ID = 'flights-info-app';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}