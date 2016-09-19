import React, { Component } from 'react'

import { resetRouteSpecificValues } from '../actions'

class RouteSpecificStateReset extends Component {

	static requireRouteSpecificStateReset(store, cb) {
		const imageUploadState = store.getState().app.basicRouteSpecificState.imageUpload;
		const mediaUploadState = store.getState().app.basicRouteSpecificState.mediaUpload;
		const popupState = store.getState().app.basicRouteSpecificState.popup;
		if (Object.keys(imageUploadState).length !== 0
				|| Object.keys(mediaUploadState).length !== 0
				|| Object.keys(popupState).length !== 0) {
			store.dispatch(resetRouteSpecificValues());
		}

		cb();
	}

	static requireRouteSpecificStateResetOnEnter(store) {
		return (nextState, transition, cb) => {
			this.requireRouteSpecificStateReset(store, cb);
		}
	}

	static requireRouteSpecificStateResetOnChange(store) {
		return (oldState, nextState, transition, cb) => {
			this.requireRouteSpecificStateReset(store, cb);
		}
	}

	render() {
		return this.props.children;
	}
}

export default RouteSpecificStateReset;
