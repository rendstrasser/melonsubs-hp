import React, { Component } from 'react'

import { resetRouteSpecificValues } from '../redux/actions'

class RouteSpecificStateReset extends Component {

	static requireRouteSpecificStateReset(store, cb) {
		if (store.getState().base.currentAddProjectCoverImg) {
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