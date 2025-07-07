import React from 'react';
import ReactDOM from 'react-dom';
import MMRApiClient from './components/MmrApiClient';
import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {
		const apikey=this.getAttribute("apiKey");
		const MakerCategoryName=this.getAttribute("MakerCategoryName");
		const globalSiteId=this.getAttribute("globalSiteId");
		const serverUrl=this.getAttribute("serverUrl");
		ReactDOM.render(
			<MMRApiClient apikey={apikey} MakerCategoryName={MakerCategoryName} globalSiteId={globalSiteId}/>,
			this
		);
	}
}
const ELEMENT_ID = 'mmr-client-extension';
if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}