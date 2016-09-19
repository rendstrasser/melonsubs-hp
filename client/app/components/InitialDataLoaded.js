import React, { Component } from 'react'
import Router from 'react-router';
import timeunit from 'timeunit'

import { reloadInitialData } from '../actions'

const refreshInterval = timeunit.minutes.toMillis(5);

class InitialDataLoaded extends Component {

	static requireInitialDataLoaded(store, nextState, transition, cb) {
		if (store.getState().app.lastInitialDataLoadedTimestamp + refreshInterval < Date.now()) {
			store.dispatch(reloadInitialData(nextState.location.pathname));
			transition('/loading');
		}

		cb();
	}

	static requireInitialDataLoadedOnEnter(store) {
		return (nextState, transition, cb) => {
			this.requireInitialDataLoaded(store, nextState, transition, cb);
		}
	}

	static requireInitialDataLoadedOnChange(store) {
		return (oldState, nextState, transition, cb) => {
			this.requireInitialDataLoaded(store, nextState, transition, cb);
		}
	}

	render() {
		return this.props.children;
	}
}

export default InitialDataLoaded;