import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import timeunit from 'timeunit'
import { connect } from 'react-redux'

import '../style/loading.scss'

import { loginSubmitted } from '../redux/actions.js'

const refreshInterval = timeunit.minutes.toMillis(1);

class Loading extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.logInError) {
			setTimeout(function() { browserHistory.push("/login")}, 1000);
		}

		if (nextProps.lastInitialDataLoadedTimestamp + refreshInterval >= Date.now()) {
			setTimeout(function() { browserHistory.push(nextProps.returnTo)}, 1000);
		} 
	}

	render() {
		return(
			<div id="loading-container">
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-green-only">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
					</div>
				</div>
				<div id="loading-text">Loading...</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return { 
		lastInitialDataLoadedTimestamp: state.base.lastInitialDataLoadedTimestamp,
		logInError: state.base.logInError,
		returnTo: state.base.returnTo
	}
}


export default connect(mapStateToProps)(Loading);