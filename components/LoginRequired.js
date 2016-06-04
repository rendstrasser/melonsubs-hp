import React, { Component } from 'react'
import Router from 'react-router';

class LoginRequired extends Component {

	static requireAuthenticated(store, transition, cb) {
		if (store.getState().base.user === undefined) {
			transition('/login');
		}

		cb();
	}

	static requireAuthenticatedOnEnter(store) {
		return (nextState, transition, cb) => {
			this.requireAuthenticated(store, transition, cb);
		}
	}

	static requireAuthenticatedOnChange(store) {
		return (oldState, nextState, transition, cb) => {
			this.requireAuthenticated(store, transition, cb);
		}
	}

	render() {
		return this.props.children;
	}
}

export default LoginRequired;