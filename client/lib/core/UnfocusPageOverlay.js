import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deactivateUnfocusPageOverlay } from './actions.js'

import './style/unfocus-page-overlay.scss'

/**
* Is used together with the component Popup and self-contained.
* Usage with another component is NOT supported.
*
* The component should be instantiated once at the top most component.
*/
class UnfocusPageOverlay extends Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { name, deactivate, popupState } = this.props;

		popupState.handleOverlayDeactivation();
		deactivate();
	}

	render() {
		const { name, popupState } = this.props;

		const style = {};
		const handleOverlayDeactivation = popupState.handleOverlayDeactivation;
		if (!handleOverlayDeactivation) {
			style.display = "none";
		}

		return(
			<div className="unfocus-page-overlay" onClick={this.handleClick} style={style} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		popupState: state.app.basicRouteSpecificState.popup
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deactivate: (() => dispatch(deactivateUnfocusPageOverlay())),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UnfocusPageOverlay);
