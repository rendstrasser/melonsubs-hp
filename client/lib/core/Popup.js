import React, { Component } from 'react'
import { connect } from 'react-redux'

import { activateUnfocusPageOverlay, closePopup } from './actions'

import './style/popup.scss'

/**
* Popup is self-contained and automatically darkens the background when opened.
* To achieve this effect, the component UnfocusPageOverlay is used.
*/
class Popup extends Component {

	static buildShowKey(name) {
		return `popup-show-${name}`
	}

	componentWillUpdate(nextProps, nextState) {
		const { id, popupState, activateUnfocusPageOverlay, closePopup } = nextProps;

		const prevShow = this.props.popupState[Popup.buildShowKey(id)];
		const show = popupState[Popup.buildShowKey(id)];
		if (show && !prevShow) {
			activateUnfocusPageOverlay(() => { 
				closePopup(Popup.buildShowKey(id)); 
			});
		}
	}

	render() {
		const { id, activateUnfocusPageOverlay, popupState } = this.props;

		const style = {};
		const show = popupState[Popup.buildShowKey(id)];
		if (!show) {
			style.display = "none";
		}

		return(
			<div id={id} className="popup" style={style}>
				<div className="card">
					{ this.props.children }
				</div>
			</div>
		)
	}
}

Popup.propTypes = {
	id: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		popupState: state.app.basicRouteSpecificState.popup
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		activateUnfocusPageOverlay: (handleOverlayDeactivation => dispatch(activateUnfocusPageOverlay(handleOverlayDeactivation))),
		closePopup: ((componentName) => dispatch(closePopup(componentName)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);